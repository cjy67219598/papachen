import Vue from "vue";
import VueRouter from "vue-router";
import "./style/index.less";
import App from "./components/app.vue";
import routes from "./routes/routes";
import iView from "iview";
Vue.use(VueRouter);
Vue.use(iView);
let router = new VueRouter({
    routes:routes
});
router.beforeEach((to, from, next) => {
    next(true);
});
router.afterEach(route => {

});
let app = new Vue({
    el:"#app",
    router:router,
    template:"<my-app></my-app>",
    components: {
        "my-app":App
    }
});