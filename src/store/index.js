// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex)
import {createStore} from 'vuex';
import {defineStore} from 'pinia';
import API_Service from '../API/API_Service.js';
import { useUserStore } from './Stores/user.js';
import { useBudgetStore } from './Stores/budget.js';

export default ({
    setup() {

        const userStore = useUserStore();
        const budgetStore = useBudgetStore();

        return {userStore, budgetStore}
    }
});