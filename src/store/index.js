// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex)
import {createStore} from 'vuex';
import API_Service from '../API/API_Service.js';

export default createStore({
    state: {
        user: '',
        loggedin: false,
        data: {
            budget: {},
            incomes: {},
            expenses: {}
        }
    },

    getters: {
        user: (state) => state.user,
        loggedin: (state) => state.loggedin,
        budget: (state) => state.data.budget,
        balance: (state) => state.data.balance,
    },

    mutations: {
        setUser: (state, user) => (state.user = user),
        setLoggedin: (state, bool) => (state.loggedin = bool),
        setBudget: (state, data) => (state.data.budget = data),
        setBalance: (state, data) => (state.data.balance = data),
    },
    actions: {
        async fetchBudget(store){
            await API_Service.GetService('budget')
            .then(data => {
                store.commit('setBudget', data);
            });
        },
        async fetchBalance(store){
            await API_Service.GetService('balance')
            .then(data => {
                store.commit('setBalance', data);
            });
        }
    }
});