import home from "../components/home/home.vue";
import register from "../components/user/register.vue";
let router = [{
    path:"/home",
    component:home,
    name:"home"
},{
    path:"/register",
    component:register,
    name:"register"
}];
export default router;