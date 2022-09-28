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
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
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
      children: [
        {
          path: 'create',
          component: balanceCreate,
        },
        {
          path: 'view',
          component: balanceView,
        }
      ]
    },
    {
      path: "/budget",
      name: "budget",
      component: budget,
      children: [
        {
          path: 'create',
          component: budgetCreate,
        },
        {
          path: 'view',
          component: budgetView,
        }
      ]
    },
  ],
});

export default router;
