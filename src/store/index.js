// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex)
import {createStore} from 'vuex'
export default createStore({
    state: {
        user: '',
        loggedin: false
    },

    getters: {
        user: (state) => state.user,
        loggedin: (state) => state.loggedin
    },

    mutations: {
        setUser: (state, user) => (state.user = user),
        setLoggedin: (state, bool) => (state.loggedin = bool)
    }
});