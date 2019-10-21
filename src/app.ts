import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import vuetify from "./plugins/vuetify";
import "./styles/index.scss";
import router from "./router";
import store from "./store/store";
import App from "./components/App.vue";

Vue.use(VueRouter);

new Vue({
  router,
  store,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount("#app");
