<template>
    <div class="user-comments my-articles-list">
        <h1 class="common-title">
            <Icon type="bowtie"></Icon>&nbsp;<span>最新评论</span>
        </h1>
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
        <Page :total="comments.page.count" :page-size="search.size" :current="comments.page.page" show-elevator @on-change="setPage" v-if="comments.page.count > search.size"></Page>
        <papa-empty msg="抱歉，暂无数据~" v-if="comments.data.length === 0"></papa-empty>
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
            },
            setPage(num){
                this.search.page = num;
                this.getComments();
            }
        },
        mounted(){
            this.getComments();
            this.read();
        }
    }
</script>