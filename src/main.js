import Vue from "vue";
import VueRouter from "vue-router";
import "./style/index.less";
import App from "./components/app.vue";
import routes from "./routes/routes";
import iView from "iview";
import bluebird from "bluebird";
import utils from "./utils";
import empty from "./components/include/empty.vue";
window.Promise = bluebird;
Vue.use(VueRouter);
Vue.use(iView);
Vue.prototype.papa = utils;
let router = new VueRouter({
    routes:routes
});
Vue.component("papa-empty",empty);
router.beforeEach((to, from, next) => {
    if(!to.name){
        next({
            name:"home"
        });
    }else if(to.name === "personal"){
        next({
            name:"myArticlesList"
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