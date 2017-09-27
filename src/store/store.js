import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
let store = new Vuex.Store({
    state:{
        userInfo:{  //用户登录信息
            nickname: "",
            headImg: "",
            isLogin:true
        },
        loginModal:false//登陆
    },
    mutations:{
        setUserInfo(state,val){
            state.userInfo = val;
        },
        login(state,val){
            state.loginModal = val;
        }
    }
});
export default store;