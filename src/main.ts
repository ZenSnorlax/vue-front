// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

const myImport = createApp(App);

myImport.use(router).use(ElementPlus).mount("#app");
