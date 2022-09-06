<template>
    <base-card>
        <div>
            <h3>This is the login page.</h3>
            <div>
                <p v-if="loggedin">You're already logged in as '{{user}}'</p>
                <form @submit.prevent="login">
                    <div class="input wrapper">
                        <label>Username</label><br/>
                        <input 
                            type="text" 
                            v-model="state.input.user" 
                            placeholder="Username" 
                            @blur="v$.input.user.$touch()"
                        />
                        <div v-if="this.v$.input.user.$error"><p>Enter a username</p></div>
                    </div>
                    <div class="input wrapper">
                        <label>Password</label><br/>
                        <input 
                            type="password" 
                            v-model="state.input.password" 
                            placeholder="Password" 
                            @blur="v$.input.password.$touch()"
                        />
                        <div v-if="this.v$.input.password.$error"><p>Enter a password</p></div>
                    </div>
                    <button v-on:submit="login()">Login</button>
                </form>
            </div>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>

            <!-- <button class="google-signin" data-onsuccess="onSignIn">Sign in google</button> -->
            <div id="g_id_onload"
                data-client_id="242131194887-qtr7rfremep6ljrv6s96pq5ihpj605pj.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="onSignIn()"
                data-auto_prompt="false">
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </div>
    </base-card>
</template>

<script>
import API_Service from '../API/API_Service.js';
import { mapMutations, mapGetters } from 'vuex';
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
    name:'Login', 
    mounted () {
        console.log("started login");
    },
    setup(){
		const state = reactive({
			input: {
				user: '',
				password: ''
			},
		});
		const rules = computed(() => {
			return {
				input: {
					user: { required },
					password: { required }
				},
			};
		});
		const v$ = useValidate(rules, state);
		return {
			state,
			v$,
		};
    },
    data() {
        return {}
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
            this.$store.commit('setUser' , user);
        },
        onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        }

    }
}
</script>
<style>

</style>
