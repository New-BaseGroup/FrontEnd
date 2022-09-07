<template>
    <base-card>
        <div>
            <h3 class="text-2xl my-4 text-center">This is the register.</h3>
            <div>
                <form @submit.prevent="register">
                    <div class="my-5">
                        <label for="username">Username</label><br/>
                        <input
                            id="username"
                            class="w-full border rounded h-12 px-4 focus:outline-none"
                            type="text" 
                            v-model="state.input.user" 
                            placeholder="Username"
                            @blur="v$.input.user.$touch()"
                        />
                        <div v-if="this.v$.input.user.$error"><p>Enter a username</p></div>
                    </div>
                    <div class="my-5">
                        <label for="password">Password</label><br/>
                        <input 
                            id="password"
                            class="w-full border rounded h-12 px-4 focus:outline-none"
                            type="password" 
                            v-model="state.input.password" 
                            placeholder="Password"
                            @blur="v$.input.password.$touch()"
                        />
                        <div v-if="this.v$.input.password.$error"><p>Enter a password</p></div>
                    </div>
                    <div class="my-5">
                        <label for="confirmpassword">Confirm password</label><br/>
                        <input 
                            id="confirmpassword"
                            class="w-full border rounded h-12 px-4 focus:outline-none"
                            v-model="state.confirmpassword"
                            type="password" 
                            placeholder="Confirm Password"
                            @blur="v$.confirmpassword.$touch()"
                        />
                        <div v-if="this.v$.confirmpassword.$error"><p>Enter a password</p></div>
                    </div>
                    <div class="my-5">
                        <label for="email">Email</label><br/>
                        <input
                            id="email"
                            class="w-full border rounded h-12 px-4 focus:outline-none"
                            type="email" 
                            v-model="state.input.email" 
                            placeholder="Email"
                            @blur="v$.input.email.$touch()"
                        />
                        <div v-if="this.v$.input.email.$error"><p>Enter a correct email</p></div>
                    </div>
                    <button class="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-700 my-4 w-full disabled:bg-teal-100" v-on:submit="register" :disabled="this.v$.input.$invalid">Register</button>
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
            await API_Service.PostService('Account/register', this.state.input)
            .then(response => {
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