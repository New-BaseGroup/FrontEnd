<template>
    <header class="px-4 bg-slate-800 shadow-md">
        <div
            class="container flex items-center justify-between mx-auto max-w-6xl h-20">
            <div class="min-h-full py-2" @click="home">
                <h1 class="tracking-wide text-4xl font-black text-white py-2">
                    SkyBudget<span class="font-mono text-slate-500">™</span>
                </h1>
            </div>
            <div
                v-if="!userStore.getLoggedin"
                class="flex align-middle min-h-full">
                <div class="toggle-login" @click="login"> 
                    <p class="my-auto">Log In</p>
                </div>
                <div class="toggle-register" @click="register">
                    <p class="my-auto">Start Your Free Trail</p>
                </div>
            </div>
            <div v-else class="flex align-middle min-h-full">
                <div class="toggle-name">
                    <p class="my-auto">{{ userStore.getUser }}</p>
                </div>
                <div class="toggle-login" @click="logout">
                    <p class="my-auto">Log out</p>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
function login() {
    router.push({ name: "login" });
}
function register() {
    router.push({ name: "register" });
}

function logout() {
    userStore.logOutUser();
    router.push({ name: "home" });
}

function home() {
    if (!userStore.getLoggedin) router.push({ name: "home" });
    else router.push({ name: "dashboard" });
}
</script>
