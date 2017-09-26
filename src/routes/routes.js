import home from "../components/home/home.vue";
import hot from "../components/home/hot.vue";
import register from "../components/user/register.vue";
import personal from "../components/user/personal.vue";
import article from "../components/user/article.vue";
import myArticlesList from "../components/user/my-articles-list.vue";
import detail from "../components/home/detail.vue";
import collections from "../components/user/collections.vue";
import comments from "../components/user/comments.vue";

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
        meta:{
            auth: true
        },
        path: "article",
        component: article,
        name: "article"
    }, {
        meta:{
            auth: true
        },
        path: "list",
        component: myArticlesList,
        name: "myArticlesList"
    },{
        meta:{
            auth:true
        },
        path:"collections",
        component:collections,
        name:"collections"
    },{
        meta:{
            auth:true
        },
        path:"comments",
        component:comments,
        name:"comments"
    }]
}];
export default router;