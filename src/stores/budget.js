import { defineStore } from "pinia";
import { ref, computed } from "vue";
import API_Service from "../API/API_Service.js";
import { useSiteStore } from "./site.js";
import { useUserStore } from "./user.js";
export const useBudgetStore = defineStore("budget", () => {
    const siteStore = useSiteStore();
    const userStore = useUserStore();
    //State
    const budget = ref();
    const budgetCategories = ref();
    const balance = ref();

    //Getters
    const getBudget = computed(() => budget.value);
    const getBudgetCategories = computed(() => budgetCategories.value);
    const getBalance = computed(() => balance.value);

    //Actions
    function setBudget(data) {
        budget.value = [data.data.message];
    }
    function setBudgetCategories(data) {
        budgetCategories.value = data.data.message.budgetCategories;
    }
    function setBalance(data) {
        let BalanceChanges = [];
        data.data.message.budgetCategories.forEach((x) => {
            x.balanceChanges.forEach((y) => {
                BalanceChanges.push(y);
            });
        });
        balance.value = BalanceChanges;
    }
    async function fetchBudget(store) {
        siteStore.setLoading(true);
        console.log(userStore.getToken);
        await API_Service.GetService("Budget/1",userStore.getToken).then((data) => {
            console.log("loading data");
            setBudgetCategories(data);
            setBalance(data);
            setBudget(data);
            siteStore.setLoading(false);
        });
    }
    async function fetchBalance(store) {
        await API_Service.GetService("balance",userStore.getToken).then((data) => {
            setBalance(data);
        });
    }

    return {
        budget,
        budgetCategories,
        balance,
        getBudget,
        getBudgetCategories,
        getBalance,
        setBudget,
        setBudgetCategories,
        setBalance,
        fetchBudget,
        fetchBalance,
    };
});
