<template>
    <div class="base-card">
        <div class="base-card-Container">
            <div
                class="flex items-center justify-center text-4xl font-black text-background-text m-3">
                <h1 class="tracking-wide">
                    SkyBudget<span class="font-mono">™</span>
                </h1>
            </div>
            <div>
                <form @submit.prevent="register">
                    <div class="input-wrapper">
                        <label class="text-sm font-medium" for="username"
                            >Username</label
                        ><br />
                        <input
                            id="username"
                            class="baseInput"
                            type="text"
                            v-model="state.input.user"
                            placeholder="Username"
                            @blur="v$.input.user.$touch()" />
                        <div v-if="this.v$.input.user.$error">
                            <p
                                v-for="error in this.v$.input.user.$errors"
                                :key="error">
                                {{ error.$message }}
                            </p>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <label class="text-sm font-medium" for="password"
                            >Password</label
                        ><br />
                        <input
                            id="password"
                            class="baseInput"
                            type="password"
                            v-model="state.input.password"
                            placeholder="Password"
                            @blur="v$.input.password.$touch()" />
                        <div v-if="this.v$.input.password.$error">
                            <p
                                v-for="error in this.v$.input.password.$errors"
                                :key="error">
                                {{ error.$message }}
                            </p>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <label class="text-sm font-medium" for="confirmpassword"
                            >Confirm password</label
                        ><br />
                        <input
                            id="confirmpassword"
                            class="baseInput"
                            v-model="state.confirmpassword"
                            type="password"
                            placeholder="Confirm Password"
                            @blur="v$.confirmpassword.$touch()" />
                        <div v-if="this.v$.confirmpassword.$error">
                            <p
                                v-for="error in this.v$.confirmpassword.$errors"
                                :key="error">
                                {{ error.$message }}
                            </p>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <label class="text-sm font-medium" for="email"
                            >Email</label
                        ><br />
                        <input
                            id="email"
                            class="baseInput"
                            type="email"
                            v-model="state.input.email"
                            placeholder="Email"
                            @blur="v$.input.email.$touch()" />
                        <div v-if="this.v$.input.email.$error">
                            <p
                                v-for="error in this.v$.input.email.$errors"
                                :key="error">
                                {{ error.$message }}
                            </p>
                        </div>
                    </div>
                    <button class="inputButton" v-on:submit="register">
                        <orbit-spinner
                            v-if="isLoading"
                            :animation-duration="2000"
                            :size="30" />
                        <p v-else>Register</p>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { OrbitSpinner } from "epic-spinners";
import { ref } from "vue";
import API_Service from "../API/API_Service.js";
import useValidate from "@vuelidate/core";
import { required, sameAs, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false);
// const regexRule = (value) =>
//     value.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");

const state = reactive({
    input: {
        user: "",
        password: "",
        email: "",
    },
    confirmpassword: "",
});

const rules = computed(() => {
    return {
        input: {
            user: { required },
            password: {
                required,
                sameAs: sameAs(state.confirmpassword),
            },
            email: { required, email },
        },
        confirmpassword: {
            required,
            sameAs: sameAs(state.input.password),
        },
    };
});

const v$ = useValidate(rules, state);

async function register() {
    isLoading.value = true;
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return (isLoading.value = false);
    await API_Service.PostService("Account/register", state.input).then(
        (response) => {
            if (response.status == "success") {
                if (
                    confirm(
                        "You're now registered " +
                            response.message +
                            " \n Do you want to be logged in with this account?"
                    )
                ) {
                    alert("You're now inlogged '" + response.message + "'");
                    // login(state.input);
                }
            } else {
                alert(response.message);
            }
            isLoading.value = false;
        }
    );
}
</script>
<style scoped></style>
