
import { defineStore } from 'pinia';

export const useBudgetStore = defineStore('budget', () => {
    //State
    const budget = ref({})
    const balance = ref({})

    //Getters
    const getBudget = computed(() => budget.value)
    const getBalance = computed(() => balance.value)

    //Actions
    function setBudget(newBudget){
        budget.value = newBudget;
    }
    function setBalance(newBalance){
        balance.value = newBalance;
    }
    async function fetchBudget(store){
        await API_Service.GetService('Budget/1')
        .then(data => {
            store.commit('setBudget', data);
        });
    }
    async function fetchBalance(store){
        await API_Service.GetService('balance')
        .then(data => {
            store.commit('setBalance', data);
        });
    }

    return { 
        budget, 
        balance, 
        getBudget,
        getBalance,
        setBudget, 
        setBalance, 
        fetchBudget, 
        fetchBalance }
})
