import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons"; //all reg icons
import { fas } from "@fortawesome/free-solid-svg-icons"; //all solid icons
import { fab } from "@fortawesome/free-brands-svg-icons"; //all barnds icons

library.add(far, fas, fab);
const pinia = createPinia();
const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.mount("#app");
