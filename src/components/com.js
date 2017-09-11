import empty from "./include/empty.vue";

let arr = [
    empty
];

export default {
    install(Vue){
        arr.map(item => {
            Vue.component(item.name,item);
        });
    }
}