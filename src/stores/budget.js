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
    const changesMade = ref(false);

    //Getters
    const getBudget = computed(() => budget.value);
    const getBudgetCategories = computed(() => budgetCategories.value);
    const getBalance = computed(() => balance.value);

    //widget getters
    const getTotalAmount = computed(() => budget.value[0]?.totalAmount);
    const getBudgetInfo = computed(
        () => `${budget.value[0]?.name} ${budget.value[0]?.totalAmount}`
    );
    const getBalanceCategories = computed(() => balanceCategories.value);
    const getAmountUsed = computed(() =>
        balance.value?.map((b) => b.amount).reduce((a, b) => a + b)
    );
    const getLatestTransactions = computed(() =>
        balance.value
            ?.sort((a, b) => a.date - b.date)
            .map((f) => f.title)
            .slice(-10)
    );
    const getCategoryInfo = computed(() =>
        budgetCategories.value?.map(
            (b) =>
                `${b.customName} ${b.maxAmount} ${b.balanceChanges
                    .map((b) => b.amount)
                    .reduce((a, b) => a + b)}`
        )
    );
    //Actions
    function setbalanceCategories(data) {
        balanceCategories.value = data;
    }
    function setBudget(data) {
        budget.value = [data];
    }
    function setBudgetCategories(data) {
        budgetCategories.value = data.budgetCategories;
    }
    function setBalance(data) {
        let BalanceChanges = [];
        data.budgetCategories.forEach((x) => {
            x.balanceChanges.forEach((y) => {
                BalanceChanges.push(y);
            });
        });
        balance.value = BalanceChanges;
    }
    async function fetchCategories(store) {
        siteStore.setLoading(true);
        await API_Service.GetService(
            "Budget/GetCategory",
            userStore.getToken
        ).then((data) => {
            setbalanceCategories(data.data.message);
            siteStore.setLoading(false);
        });
    }
    async function fetchBudget(store) {
        if (userStore.loggedin) {
            siteStore.setLoading(true);
            await API_Service.GetService("Budget/1", userStore.getToken).then(
                (data) => {
                    console.log("loading data");
                    console.log(data);
                    setBudgetCategories(data.data.message);
                    setBalance(data.data.message);
                    setBudget(data.data.message);
                    siteStore.setLoading(false);
                }
            );
        }
    }
    async function postNewBudget(newBudget) {
        if(userStore.loggedin) {
             await API_Service.PostService("Budget",newBudget,userStore.getToken).then(
                (result) => {
                    return result;
           })
         }
    }
    async function fetchBalance(store) {
        await API_Service.GetService("balance", userStore.getToken).then(
            (data) => {
                setBalance(data);
            }
        );
    }
    async function findObjectAndChange(change, path, object, key, type) {
        const foundIndex = path.findIndex((obj) => obj[key] === object[key]);

        if (change === "update") {
            path[object[key - 1]] = object;
            await API_Service.PutService(type, object, userStore.getToken).then(
                (data) => {
                    console.log(data);
                }
            );
        } else if (change === "delete") {
            path.splice(object[key - 1], 1);
            await API_Service.DeleteService(
                `${type}?id=${object[key - 1]}`,
                userStore.getToken
            ).then((data) => {
                console.log(data);
            });
        }
    }
    return {
        budget,
        budgetCategories,
        balance,
        changesMade,
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
        findObjectAndChange,
        fetchBudget,
        postNewBudget,
    };
});
