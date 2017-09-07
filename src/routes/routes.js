import home from "../components/home/home.vue";
import register from "../components/user/register.vue";
import personal from "../components/user/personal.vue";
import article from "../components/user/article.vue";
import myArticlesList from "../components/user/my-articles-list.vue";
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
    name:"personal",
    children:[{
        path:"article",
        component:article,
        name:"article"
    },{
        path:"list",
        component:myArticlesList,
        name:"myArticlesList"
    }]
}];
export default router;