<template>
    <div
        class="base-card"
        data-aos="slide-down"
        data-aos-ease="ease"
        data-aos-duration="1500"
        data-aos-delay="500">
        <img
            class="w-96"
            src="https://res.cloudinary.com/dsderm9xw/image/upload/v1622028057/3D%20Illustrations/3d-illustration1_j06j0a.png"
            alt="3d illustration of boy with laptop sitting" />
        <div class="base-card-Container">
            <p v-if="userStore.getLoggedin">
                You're already logged in as '{{ userStore.getUser }}'
            </p>
            <p v-if="responseMessage" class="bg-red-600">
                Wrong username or password!
            </p>
            <form @submit.prevent="login" class="flex flex-col justify-center">
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
                <button class="inputButton" v-on:submit="login()">
                    <orbit-spinner
                        v-if="isLoading"
                        :animation-duration="2000"
                        :size="25" />
                    <p v-if="!isLoading">Login</p>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import API_Service from "../API/API_Service.js";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useUserStore } from "../stores/user.js";
import { OrbitSpinner } from "epic-spinners";
const userStore = useUserStore();

const router = useRouter();
const isLoading = ref(false);
const state = reactive({
    input: {
        user: "",
        password: "",
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
const responseMessage = ref(false);
const v$ = useValidate(rules, state);
async function login() {
    isLoading.value = true;
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;

    await API_Service.PostService("Account/login", state.input).then(
        (response) => {
            isLoading.value = false;
            if (response.status == "success") {
                responseMessage.value = false;
                updateLoggedin(response);
                router.push({ name: "dashboard" });
            } else {
                responseMessage.value = true;
            }
        }
    );
}

function updateLoggedin(respons) {
    userStore.setLoggedin(true);
    userStore.setUser(respons.message);
    userStore.setToken(respons.token);
}
</script>
<style></style>
