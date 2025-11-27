import { createApp } from "vue";

import App from "./App.vue";
import { router, store } from "./core";

const app = createApp(App);
app.use(store).use(router).mount("#app");
