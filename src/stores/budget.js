import { defineStore } from "pinia";
import { ref, computed } from "vue";
import API_Service from "../API/API_Service.js";
import { useSiteStore } from "./site.js";
import { useUserStore } from "./user.js";
export const useBudgetStore = defineStore("budget", () => {
    const siteStore = useSiteStore();
    const userStore = useUserStore();
    //State
    const budget = ref([]);
    const budgetCategories = ref();
    const balance = ref();
    const balanceCategories = ref();
    const changesMade = ref(false);
    const budgetList = ref();
    const currentBudgetID = ref();

    //Getters
    const getBudget = computed(() => {
        const index = budget.value.findIndex((object) => {
            return object.budgetID === currentBudgetID.value;
        });
        if (index === -1) {
            return [];
        } else return budget.value[index];
    });
    const getBudgetCategories = computed(() => budgetCategories.value);
    const getBalance = computed(() => {
        const index = budget.value.findIndex((object) => {
            return object.budgetID === currentBudgetID.value;
        });
        if (index === -1) {
            return [];
        } else {
            let BalanceChanges = [];
            budget.value[index].budgetCategories.forEach((x) => {
                x.balanceChanges.forEach((y) => {
                    BalanceChanges.push(y);
                });
            });
            return BalanceChanges;
        }
    });
    const getBudgetList = computed(() => budgetList.value);

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
            .map((f) => `${f.title}: ${f.amount}`)
            .slice(-10)
    );
    const getCategoryInfo = computed(() =>
        budgetCategories.value?.map(
            (b) =>
                `${b.customName}: ${b.balanceChanges
                    .map((b) => b.amount)
                    .reduce((a, b) => a + b)} / ${b.maxAmount}`
        )
    );
    const getUsedAndTotal = computed(
        () => `${getAmountUsed} / ${getTotalAmount}`
    );
    const WidgetStandard = computed(() => "Please select a setting");
    const getCurrentBudgetID = computed(() => currentBudgetID.value);
    //Actions
    function setbalanceCategories(data) {
        balanceCategories.value = data;
    }
    function addBudget(data) {
        const index = budget.value.findIndex((object) => {
            return object.budgetID === data.budgetID;
        });
        if (index === -1) {
            budget.value.push(data);
        } else budget.value[index] = data;
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
    function setBudgetList(data) {
        budgetList.value = data;
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
    function resetAll() {
        budget.value = [];
        budgetCategories.value = null;
        balance.value = null;
        balanceCategories.value = null;
        changesMade.value = false;
        budgetList.value = null;
        currentBudgetID.value = null;
    }
    async function fetchBudget(id) {
        if (userStore.loggedin) {
            siteStore.setLoading(true);
            const findBudget = budget.value?.find(
                (budget) => budget.budgetID === id
            );
            if (!findBudget) {
                await API_Service.GetService(
                    `Budget/${id}`,
                    userStore.getToken
                ).then((data) => {
                    setBudgetCategories(data.data.message);
                    setBalance(data.data.message);
                    addBudget(data.data.message);
                    siteStore.setLoading(false);
                });
            }
            siteStore.setLoading(false);
        }
    }
    async function fetchBudgetList(store) {
        if (userStore.loggedin) {
            console.log("HEHE");
            siteStore.setLoading(true);
            await API_Service.GetService(
                "Budget/budgetList",
                userStore.getToken
            ).then((data) => {
                setCurrentBudgetID(Object.keys(data.data.message)[0]);
                setBudgetList(data.data.message);
                siteStore.setLoading(false);
            });
        }
    }
    async function postNewBudget(newBudget) {
        if (userStore.loggedin) {
            await API_Service.PostService(
                "Budget",
                newBudget,
                userStore.getToken
            ).then((result) => {
                return result;
            });
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
            await API_Service.PutService(type, object, userStore.getToken);
        } else if (change === "delete") {
            path.splice(object[key - 1], 1);
            await API_Service.DeleteService(
                `${type}?id=${object[key - 1]}`,
                userStore.getToken
            );
        }
    }
    function setCurrentBudgetID(id) {
        currentBudgetID.value = parseInt(id);
        if (getBudget.budgetID == null) {
            fetchBudget(currentBudgetID.value);
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
        getUsedAndTotal,
        addBudget,
        setBudgetCategories,
        setBalance,
        fetchBudget,
        fetchBalance,
        fetchCategories,
        findObjectAndChange,
        fetchBudget,
        postNewBudget,
        getBudgetList,
        WidgetStandard,
        setCurrentBudgetID,
        fetchBudgetList,
        getCurrentBudgetID,
        resetAll,
    };
});
