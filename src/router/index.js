import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import register from "../views/Register.vue";
import login from "../views/Login.vue";
import expense from "../components/expense/expense.vue";
import income from "../components/income/income.vue";
import budget from "../components/budget/Budget.vue";
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
      path: "/income",
      name: "income",
      component: income,
    },
    {
      path: "/expense",
      name: "expense",
      component: expense,
    },
    {
      path: "/budget",
      name: "budget",
      component: budget,
    },
  ],
});

export default router;
