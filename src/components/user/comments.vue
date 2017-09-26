<template>
    <div class="user-comments my-articles-list">
        <div class="list">
            <Card class="item" v-for="(val,key) in comments.data" :key="key">
                <p class="title">
                    <router-link :to="'/detail?id=' + val.article._id">{{val.article.title}}</router-link>
                </p>
                <div class="intro">
                    <span>{{val.userBy.nickname}}：</span>
                    <span>{{val.content}}</span>
                </div>
                <p class="time">
                    <span>{{papa.time(val.createTime,1)}}</span>
                </p>
            </Card>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                comments:{
                    page:{},
                    data:[]
                },
                search:{
                    page:1,
                    size:5
                }
            }
        },
        methods:{
            getComments(){
                this.papa.post("users/comments",this.search).then(data => {
                    this.comments = data;
                }).catch(err => {

                });
            },
            read(){
                this.papa.post("users/read",{}).then(data => {
                    this.$parent.commentCount();
                }).catch(err => {

                });
            }
        },
        mounted(){
            this.getComments();
            this.read();
        }
    }
</script>