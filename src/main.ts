import { createApp } from "vue";
import router from "@router/index";
import store from "@store/index";
import AdminLink from "@components/navigation/admin-link.vue";

import App from "./App.vue";

createApp(App)
    .use(store)
    .use(router)
    .component("AdminLink", AdminLink)
    .mount("#app");
