<template>
    <div class="sideBarContainer">
        <div class="sideBarContent">
            <div v-for="item in navItems" :key="item">
                <RouterLink
                    :key="item.name"
                    :to="item.link"
                    class="sideBardNavigation"
                    active-class="sideBarNavigationActive"
                    @click="setActiveSublink(item)"
                    v-if="
                        item.availability === 'all' ||
                        (item.availability === 'user' && userStore.getLoggedin)
                    ">
                    <template v-if="isLoading && activeSub == item.title">
                        <orbit-spinner
                            v-if="isLoading"
                            :animation-duration="2000"
                            :size="20"
                            :color="
                                siteStore.getTheme === 'light-theme'
                                    ? '#3094a1'
                                    : '#a9d712'
                            " />
                    </template>
                    <span v-else>
                        <font-awesome-icon :icon="item.icon" />
                    </span>
                    <p class="sideBarText">
                        {{ item.title }}
                    </p>
                </RouterLink>
                <div
                    v-for="sublink in item.sublinks"
                    :key="sublink"
                    v-show="activeSub == item.title">
                    <router-link
                        :key="sublink.name"
                        :to="sublink.link"
                        class="sideBardNavigationSub"
                        active-class="sideBarNavigationActiveSub"
                        @click="loading">
                        <orbit-spinner
                            v-if="isLoading"
                            :animation-duration="2000"
                            :size="15" />
                        <span v-else>
                            <font-awesome-icon :icon="sublink.icon" />
                        </span>
                        <span class="sideBarText">{{ sublink.title }}</span>
                    </router-link>
                </div>
            </div>
            <!-- <button
	    @click="expand"
	    class="sideBarButton"
	>
		<font-awesome-icon :icon="expanded === true ? 'caret-left' : 'caret-right'" />
		</button> -->
        <div v-if="userStore.getLoggedin">
        <div class="toggle" @click="logout"><font-awesome-icon
		    icon="fa-solid fa-arrow-right-from-bracket"
		    class="text-xl text-[#fff] hover:text-[#2b2b2b] mr-2"
		/>Logout</div>
    </div>
            <ThemeToggle />
        </div>
    </div>
</template>

<script setup>
import { useSiteStore } from "../../stores/site";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ThemeToggle from "./ThemeToggle.vue";
import { OrbitSpinner } from "epic-spinners";
import { useUserStore } from "../../stores/user";
const siteStore = useSiteStore();
const userStore = useUserStore();
const router = useRouter();
const expanded = ref(true);
const isLoading = ref(false);
const activeSub = ref("");
function expand() {
    expanded.value = !expanded.value;
}
function loading() {
    isLoading.value = true;
    setTimeout(function () {
        isLoading.value = false;
    }, 1000);
}
function setActiveSublink(parent) {
    loading();
    this.activeSub == parent.title
        ? (this.activeSub = "")
        : (this.activeSub = parent.title);
}
function logout() {
    userStore.logOutUser();
    router.push({ name: "login" });
}
const navItems = [
    {
        icon: "home",
        title: "Dashboard",
        link: "/dashboard",
        availability: "user",
    },
    {
        icon: "notes-medical",
        title: "Transaction",
        link: "/balance",
        availability: "user",
        sublinks: [
            {
                icon: "fa-solid fa-list",
                title: "View",
                link: "/balance/view",
            },
            {
                icon: "fa-solid fa-plus",
                title: "Create",
                link: "/balance/create",
            },
        ],
    },
    {
        icon: "wallet",
        title: "Budget",
        link: "/budget",
        availability: "user",
        sublinks: [
            {
                icon: "fa-solid fa-list",
                title: "View",
                link: "/budget/view",
            },
            {
                icon: "fa-solid fa-plus",
                title: "Create",
                link: "/budget/create",
            },
        ],
    },
    {
        icon: "id-card",
        title: "Register",
        link: "/register",
        availability: "all",
    },
    {
        icon: "eye",
        title: "Login",
        link: "/login",
        availability: "all",
    },
];
</script>
