<template>
    <base-card>
        <div>
            <h3>This is the register.</h3>
            <div>
                <form @submit.prevent="register">
                    <div class="inputWrapper">
                        <label>Username</label><br/>
                        <input 
                            type="text" 
                            v-model="input.user" 
                            placeholder="Username"
                            @blur="v$.input.password.$touch()"
                        />
                        <div v-if="this.v$.input.user.$error"><p>Enter a username</p></div>
                    </div>
                    <div class="inputWrapper">
                        <label>Password</label><br/>
                        <input 
                            type="password" 
                            v-model="input.password" 
                            placeholder="Password"
                            @blur="v$.input.password.$touch()"
                        />
                        <div v-if="this.v$.input.password.$error"><p>Enter a password</p></div>
                    </div>
                    <div class="inputWrapper">
                        <label>Confirm password</label><br/>
                        <input 
                            type="password" 
                            placeholder="Confirm Password"
                            @blur="v$.confirmpassword.$touch()"
                        />
                        <div v-if="this.v$.confirmpassword.$error"><p>Enter a password</p></div>
                    </div>
                    <div class="inputWrapper">
                        <label>Email</label><br/>
                        <input 
                            type="email" 
                            v-model="input.email" 
                            placeholder="Email"
                            @blur="v$.input.email.$touch()"
                        />
                        <div v-if="this.v$.input.email.$error"><p>Enter a correct email</p></div>
                    </div>
                    <button v-on:submit="register">Register</button>
                </form>
            </div>
        </div>
    </base-card>
</template>

<script>
import API_Service from '../API/API_Service.js';
import useValidate from "@vuelidate/core";
import { required, sameAs, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
    name:'register', 
    mounted () {
        console.log("started registration");
    },
    setup(){
		const state = reactive({
			input: {
				user: '',
				password: '',
                email: ''
			},
            confirmpassword: ''
		});
		const rules = computed(() => {
			return {
				input: {
					user: { required },
					password: { required, sameAs: sameAs(state.confirmpassword) },
                    email: { required, email }
				},
                confirmpassword: {required}
			};
		});
		const v$ = useValidate(rules, state);
		return {
			state,
			v$,
		};
    },
    data() {
        return {
            input: {
                user: '',
                password: '',
                email: ''
            },
            users: []
        }
    },
    methods: {
        async register () {
            await API_Service.PostService('Account/register', this.input)
            .then(function(response){
            if(response?.status == 'success'){
                alert("You're now registered " + response?.message);
            } else {
                alert(response.message);
            }
            });
        },
    }
}
</script>
<style scoped>
.inputWrapper{
    margin: auto;
}
</style>