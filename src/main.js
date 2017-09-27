import Vue from "vue";
import VueRouter from "vue-router";
import "./style/index.less";
import App from "./components/app.vue";
import routes from "./routes/routes";
import iView from "iview";
import bluebird from "bluebird";
import utils from "./utils/utils";
import com from "./utils/com";
import store from "./store/store";
window.Promise = bluebird;
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(com);
Vue.use(utils);
let router = new VueRouter({
    routes:routes
});
router.beforeEach((to, from, next) => {
    if(app && to.matched.some(record => record.meta.auth) && !store.state.userInfo.isLogin){
        next(false);
        store.commit("login",true);
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
    store:store,
    template:"<App />",
    components: {
        "App":App
    }
});