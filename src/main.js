import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons"; //all reg icons
import { fas } from "@fortawesome/free-solid-svg-icons"; //all solid icons
import { fab } from "@fortawesome/free-brands-svg-icons"; //all barnds icons
import AOS from "aos";
import "aos/dist/aos.css";

library.add(far, fas, fab);
const pinia = createPinia();
const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
AOS.init({
    // Global settings:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
app.use(router);
app.use(pinia);
app.mount("#app");
