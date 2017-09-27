import empty from "../components/include/empty.vue";

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