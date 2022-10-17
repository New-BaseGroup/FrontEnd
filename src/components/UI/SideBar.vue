<template>
    <div class="sideBarContainer">
        <div class="sideBarContent">
            <div
                v-for="item in navItems"
                :key="item"
            >
                <RouterLink
                    :key="item.name"
                    :to="item.link"
                    class="sideBardNavigation"
                    active-class="sideBarNavigationActive"
                    @click="setActiveSublink(item)"
                    v-if="item.availability === 'all' || (item.availability === 'user' && userStore.getLoggedin)"
                >
                    <span>
                        <font-awesome-icon :icon="item.icon" />
                    </span>
                    <span class="sideBarText">
                        {{ item.title }}
                    </span>
                    </RouterLink>
                    <div
                        v-for="sublink in item.sublinks"
                        :key="sublink"
                        v-show="activeSub == item.title"
                    >
                        <router-link
                            :key="sublink.name"
                            :to="sublink.link"
                            class="sideBardNavigationSub"
                            active-class="sideBarNavigationActiveSub"
                        >
                            <span>
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
        <button @click="logout">Logout</button>
    </div>
    <ThemeToggle />
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
const expanded = ref(true);
const activeSub = ref("");
function expand() {
    expanded.value = !expanded.value;
}
function setActiveSublink(parent) {
    this.activeSub == parent.title
        ? (this.activeSub = "")
        : (this.activeSub = parent.title);
}
function logout() {
    userStore.logOutUser();
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
