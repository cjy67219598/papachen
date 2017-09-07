<template>
    <div class="my-articles-list">

    </div>
</template>
<script>
    export default {
        data(){
            return {
                search:{
                    page:1,
                    counts:5
                }
            }
        },
        methods:{
            getList(){
                this.papa.post("article/list",this.search).then((data) => {

                }).catch(() => {

                });
            }
        },
        mounted(){
            this.getList();
        }
    }
</script>