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
    const balanceCategories = ref();

    //Getters
    const getBudget = computed(() => budget.value);
    const getBudgetCategories = computed(() => budgetCategories.value);
    const getBalance = computed(() => balance.value);
    const getTotalAmount = computed(() => budget.value[0].totalAmount);
    const getBudgetInfo = computed(
        () => `${budget.value[0].name} ${budget.value[0].totalAmount}`
    );
    const getBalanceCategories = computed(() => balanceCategories.value);
    const getAmountUsed = computed(() =>
        balance.value.map((b) => b.amount).reduce((a, b) => a + b)
    );
    const getLatestTransactions = computed(() =>
        balance.value
            .sort((a, b) => a.date - b.date)
            .map((f) => f.title)
            .slice(-10)
    );
    const getCategoryInfo = computed(() =>
        budgetCategories.value.map(
            (b) =>
                `${b.customName} ${b.maxAmount} ${b.balanceChanges
                    .map((b) => b.amount)
                    .reduce((a, b) => a + b)}`
        )
    );
    //Actions
    function setbalanceCategories(data) {
        balanceCategories.value = data.data.message;
    }
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
    async function fetchCategories(store) {
        siteStore.setLoading(true);
        await API_Service.GetService("Budget/GetCategory", userStore.getToken).then(
            (data) => {
              
                setbalanceCategories(data);
                siteStore.setLoading(false);
            }
        );
    }
    async function fetchBudget(store) {
        siteStore.setLoading(true);
        await API_Service.GetService("Budget/1", userStore.getToken).then(
            (data) => {
                console.log("loading data");
                console.log(data);
                setBudgetCategories(data);
                setBalance(data);
                setBudget(data);
                siteStore.setLoading(false);
            }
        );
    }
    async function fetchBalance(store) {
        await API_Service.GetService("balance", userStore.getToken).then(
            (data) => {
                setBalance(data);
            }
        );
    }
    async function deleteObject(type, id) {
        await API_Service.DeleteService(
            `${type}/${id}`,
            userStore.getToken
        ).then((data) => {
            console.log(data);
        });
    }
    return {
        budget,
        budgetCategories,
        balance,
        getBudget,
        getBudgetCategories,
        getBalance,
        getAmountUsed,
        getBudgetInfo,
        getLatestTransactions,
        getCategoryInfo,
        getTotalAmount,
        getBalanceCategories,
        setBudget,
        setBudgetCategories,
        setBalance,
        fetchBudget,
        fetchBalance,
        fetchCategories,
    };
});
