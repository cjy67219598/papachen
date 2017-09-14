import Vue from "vue";
import VueRouter from "vue-router";
import "./style/index.less";
import App from "./components/app.vue";
import routes from "./routes/routes";
import iView from "iview";
import bluebird from "bluebird";
import utils from "./utils";
import com from "./components/com";
window.Promise = bluebird;
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(com);
Vue.prototype.papa = utils;
let router = new VueRouter({
    routes:routes
});
router.beforeEach((to, from, next) => {
    if(app && to.matched.some(record => record.meta.auth) && !app.$children[0].userInfo.isLogin){
        next(false);
        app.$children[0].login();
    }else{
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
    }
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