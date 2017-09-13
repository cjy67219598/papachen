import home from "../components/home/home.vue";
import hot from "../components/home/hot.vue";
import register from "../components/user/register.vue";
import personal from "../components/user/personal.vue";
import article from "../components/user/article.vue";
import myArticlesList from "../components/user/my-articles-list.vue";
import detail from "../components/home/detail.vue";

let router = [{
    meta: {
        home: true,
        name:"home"
    },
    path: "/home",
    component: home,
    name: "home"
}, {
    meta: {
        home: true,
        name:"hot"
    },
    path: "/hot",
    component: hot,
    name: "hot"
}, {
    path: "/register",
    component: register,
    name: "register"
}, {
    path: "/detail",
    component: detail,
    name: "detail"
}, {
    path: "/personal",
    component: personal,
    name: "personal",
    meta: {
        auth: true,
        home: true,
        name:"personal"
    },
    children: [{
        path: "article",
        component: article,
        name: "article"
    }, {
        path: "list",
        component: myArticlesList,
        name: "myArticlesList"
    }]
}];
export default router;