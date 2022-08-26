import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import IncomeComponent from "./components/income/IncomeComponent.vue";
import BaseCard from "./components/UI/BaseCard.vue";

const app = createApp(App);
app.component("income-component", IncomeComponent);
app.component("base-card", BaseCard);

app.use(router)
app.use(store)

app.mount("#app");
