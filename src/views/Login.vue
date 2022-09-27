<template>
	<div class="base-card">
		<div class="base-card-Container">
			<div class="flex items-center justify-center text-4xl font-black text-background-text m-3">
				<h1 class="tracking-wide">SkyBudget<span class="font-mono">™</span></h1>
			</div>
			<div>
				<p v-if="loggedin">You're already logged in as '{{ user }}'</p>
				<form @submit.prevent="login" class="flex flex-col justify-center">
					<label class="text-sm font-medium" for="username">Username</label>
					<input
						id="username"
						class="baseInput"
						type="text"
						v-model="state.input.user"
						placeholder="Username"
						required
						@blur="v$.input.user.$touch()"
					/>

					<label class="text-sm font-medium" for="password">Password</label>
					<input
						id="password"
						class="baseInput"
						type="password"
						required
						v-model="state.input.password"
						placeholder="Password"
						@blur="v$.input.password.$touch()"
					/>

					<button class="inputButton" v-on:submit="login()">Login</button>
				</form>
			</div>
			<div class="g-signin2" data-onsuccess="onSignIn"></div>

			<!-- <button class="google-signin" data-onsuccess="onSignIn">Sign in google</button> -->
			<div
				id="g_id_onload"
				data-client_id="242131194887-qtr7rfremep6ljrv6s96pq5ihpj605pj.apps.googleusercontent.com"
				data-context="signin"
				data-ux_mode="popup"
				data-callback="onSignIn()"
				data-auto_prompt="false"
			></div>

			<div
				class="g_id_signin"
				data-type="standard"
				data-shape="rectangular"
				data-theme="outline"
				data-text="signin_with"
				data-size="large"
				data-logo_alignment="left"
			></div>
		</div>
	</div>
</template>

<script>
import API_Service from '../API/API_Service.js';
import { mapMutations, mapGetters } from 'vuex';
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, computed } from 'vue';

export default {
	name: 'Login',
	mounted() {
		console.log('started login');
	},
	setup() {
		const state = reactive({
			input: {
				user: '',
				password: '',
			},
		});
		const rules = computed(() => {
			return {
				input: {
					user: { required },
					password: { required },
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
		return {};
	},
	computed: {
		...mapGetters(['user', 'loggedin']),
	},
	methods: {
		...mapMutations({
			setUser: 'setUser',
			setLoggedin: 'setLoggedin',
		}),
		async login() {
			await API_Service.PostService('Account/login', this.state.input).then((response) => {
				console.log(response);
				if (response?.status == 'success') {
					this.updateLoggedin(response.message);
					alert("Du är nu inloggad '" + response?.message + "'");
				} else {
					alert(response.message);
				}
			});
		},
		updateLoggedin(user) {
			this.$store.commit('setLoggedin', true);
			this.$store.commit('setUser', user);
		},
		onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();
			console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
		},
	},
};
</script>
<style></style>
