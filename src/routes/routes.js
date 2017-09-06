import home from "../components/home/home.vue";
import register from "../components/user/register.vue";
import personal from "../components/user/personal.vue";
let router = [{
    path:"/home",
    component:home,
    name:"home"
},{
    path:"/register",
    component:register,
    name:"register"
},{
    path:"/personal",
    component:personal,
    name:"personal"
}];
export default router;