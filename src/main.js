import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import routes from "./routes/routes";
require("./style/index.less");
Vue.use(VueRouter);
let router = new VueRouter({
    routes:routes
});
router.beforeEach((to, from, next) => {

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