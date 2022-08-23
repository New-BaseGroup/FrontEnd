import { createApp } from "vue";
import App from "./App.vue";
import IncomeComponent from "./components/income/IncomeComponent.vue";
import BaseCard from "./components/UI/BaseCard.vue";

const app = createApp(App);
app.component("income-component", IncomeComponent);
app.component("base-card", BaseCard);

app.mount("#app");
