import { createApp } from "vue";
import App from "./App.vue";
import ExpenseComponent from "./components/expense/ExpenseComponent.vue";
const app = createApp(App);

app.component("expense-component", ExpenseComponent);

app.mount("#app");
