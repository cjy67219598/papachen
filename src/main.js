import Vue from "vue";
import VueRouter from "vue-router";
import "./style/index.less";
import App from "./components/app.vue";
import routes from "./routes/routes";
import iView from "iview";
import bluebird from "bluebird";
window.Promise = bluebird;
Vue.use(VueRouter);
Vue.use(iView);
let router = new VueRouter({
    routes:routes
});
router.beforeEach((to, from, next) => {
    if(!to.name){
        next({
            name:"home"
        });
    }else{
        next(true);
    }
});
router.afterEach(route => {

});
new Vue({
    el:"#app",
    router:router,
    template:"<my-app></my-app>",
    components: {
        "my-app":App
    }
});