import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import BaseCard from "./components/UI/BaseCard.vue";
import "./assets/tailwind.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons"; //all reg icons
import { fas } from "@fortawesome/free-solid-svg-icons"; //all solid icons
import { fab } from "@fortawesome/free-brands-svg-icons"; //all barnds icons

library.add(far, fas, fab);

const app = createApp(App)
  .component("base-card", BaseCard)
  .component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);

app.mount("#app");
