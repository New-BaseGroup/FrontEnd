<template>
    <div>
        <h3>This is the login page.</h3>
        <div>
            <p v-if="loggedin">You're already logged in as '{{user}}'</p>
            <form @submit.prevent="login">
                <div class="input wrapper">
                    <label>Username</label><br/>
                    <input type="text" v-model="input.user" placeholder="Username"/>
                </div>
                <div class="input wrapper">
                    <label>Password</label><br/>
                    <input type="password" v-model="input.password" placeholder="Password"/>
                </div>
                <button v-on:submit="login()">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import API_Service from '../API/API_Service.js'
import { mapMutations, mapGetters } from 'vuex';

export default {
    name:'Login', 
    mounted () {
        console.log("started login");
    },
    data() {
        return {
            input: {
                user: "",
                password: ""
            }
        }
    },
    computed: {
        ...mapGetters(['user','loggedin'])
    },
    methods: {
        ...mapMutations({
            setUser: 'setUser',
            setLoggedin: 'setLoggedin'
        }),
        async login() {
            await API_Service.PostService('Account/login', this.input)
            .then(function(response){
                console.log(response);
                if(response?.status == 'success'){
                    // updateLoggedin(response.message);
                    alert("Du är nu inloggad '" + response?.message + "'");
                } else {
                    alert(response.message);
                }
            });
        },
        updateLoggedin(user){
            this.$store.commit('setLoggedin', true);
            this.$store.commmit('setUser' , user)
        }
    }
}
</script>
