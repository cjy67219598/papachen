<template>
    <div class="empty">
        <p><Icon type="heart-broken" size="16"></Icon>&nbsp;{{msg || "抱歉，没有相关内容！"}}</p>
    </div>
</template>
<script>
    export default {
        name:"papa-empty",
        props:["msg"],
        data(){
            return {

            }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>