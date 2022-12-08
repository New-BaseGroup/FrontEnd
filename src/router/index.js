import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import register from "../views/Register.vue";
import login from "../views/Login.vue";
import balance from "../views/Balance.vue";
import balanceCreate from "../components/balance/balance.vue";
import balanceView from "../components/balance/balanceView.vue";
import budgetCreate from "../components/budget/Budget.vue";
import budgetView from "../components/budget/budgetView.vue";
import budget from "../views/Budget.vue";
import splashPage from "../components/splashScreen/splash.vue";
import { useUserStore } from "../stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component:splashPage,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
        },
        {
            path: "/login",
            name: "login",
            component: login,
        },
        {
            path: "/register",
            name: "register",
            component: register,
        },
        {
            path: "/balance",
            name: "balance",
            component: balance,
            redirect: "/balance/view",
            children: [
                {
                    path: "/balance/view",
                    component: balanceView,
                },
                {
                    path: "/balance/create",
                    component: balanceCreate,
                },
            ],
        },
        {
            path: "/budget",
            name: "budget",
            component: budget,
            redirect: "/budget/view",
            children: [
                {
                    path: "/budget/view",
                    component: budgetView,
                },
                {
                    path: "/budget/create",
                    component: budgetCreate,
                },
            ],
        },
    ],
});

router.beforeEach((to, from) => {
    const userStore = useUserStore();

    if (
        !userStore.getLoggedin &&
        to.name !== "login" &&
        to.name !== "register" &&
        to.name !== "home"
    )
        return { name: "login" };
});

export default router;
