<template>
	<div class="base-card">
		<div class="base-card-Container">
			<div class="flex items-center justify-center text-4xl font-black text-background-text m-3">
				<h1 class="tracking-wide">SkyBudget<span class="font-mono">™</span></h1>
			</div>
			<h3 class="text-2xl my-4 text-center">Register a new user</h3>
			<div>
				<form @submit.prevent="register">
					<label class="text-sm font-medium" for="username">Username</label><br />
					<input
						id="username"
						class="baseInput"
						type="text"
						v-model="state.input.user"
						placeholder="Username"
						required
						@blur="v$.input.user.$touch()"
					/>

					<label for="password">Password</label><br />
					<input
						id="password"
						class="baseInput"
						type="password"
						v-model="state.input.password"
						placeholder="Password"
						required
						@blur="v$.input.password.$touch()"
					/>

					<label for="confirmpassword">Confirm password</label><br />
					<input
						id="confirmpassword"
						class="baseInput"
						v-model="state.confirmpassword"
						type="password"
						required
						placeholder="Confirm Password"
						@blur="v$.confirmpassword.$touch()"
					/>

					<label for="email">Email</label><br />
					<input
						id="email"
						class="baseInput"
						type="email"
						v-model="state.input.email"
						placeholder="Email"
						required
						@blur="v$.input.email.$touch()"
					/>

					<button class="inputButton" v-on:submit="register">Register</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import API_Service from '../API/API_Service.js';
import useValidate from '@vuelidate/core';
import { required, sameAs, email } from '@vuelidate/validators';
import { reactive, computed } from 'vue';

export default {
	name: 'register',
	mounted() {
		console.log('started registration');
	},
	setup() {
		const state = reactive({
			input: {
				user: '',
				password: '',
				email: '',
			},
			confirmpassword: '',
		});
		const rules = computed(() => {
			return {
				input: {
					user: { required },
					password: { required, sameAs: sameAs(state.confirmpassword) },
					email: { required, email },
				},
				confirmpassword: { required },
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
				email: '',
			},
			users: [],
		};
	},
	methods: {
		async register() {
			await API_Service.PostService('Account/register', this.state.input).then((response) => {
				if (response?.status == 'success') {
					alert("You're now registered " + response?.message);
				} else {
					alert(response.message);
				}
			});
		},
	},
};
</script>

