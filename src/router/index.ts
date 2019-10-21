import VueRouter from "vue-router";
import Home from "../components/pages/Home/Home.vue";
import About from "../components/pages/About/About.vue";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: About
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
