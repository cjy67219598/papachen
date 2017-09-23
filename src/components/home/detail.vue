<template>
    <div class="article-detail">
        <Card>
            <Icon :type="isCollected ? 'android-star' : 'android-star-outline'" class="collect" size="22" title="点击收藏"
                  @click.native="collect()"></Icon>
            <div class="title">
                <h3>{{detail.data.title}}</h3>
            </div>
            <div class="intro">简介：{{detail.data.intro}}</div>
            <div class="time">
                <Icon type="ios-clock-outline"></Icon>&nbsp;{{papa.time(detail.data.createTime, 1)}}
                &nbsp;&nbsp;&nbsp;
                <Icon type="ios-eye" size="18"></Icon>&nbsp;{{detail.data.counts}}
                &nbsp;&nbsp;&nbsp;
                <Icon type="person"></Icon>&nbsp;{{detail.data.user.nickname}}
            </div>
            <div v-html="detail.data.content"></div>
        </Card>
        <Card class="comment">
            <p slot="title">最新评论</p>
            <papa-empty msg="抱歉，暂无数据~" v-if="comments.data.length === 0"></papa-empty>
            <Page :total="comments.page.count" :page-size="search.size" :current="comments.page.page" show-elevator @on-change="setPage" v-if="comments.page.count > search.size"></Page>

        </Card>
    </div>
</template>
<script>
    export default {
        props: ["user"],
        data() {
            return {
                detail: {
                    data: {
                        user: {}
                    }
                },
                comments: {
                    page: {},
                    data: []
                },
                search:{
                    id:this.$route.query.id,
                    page:1,
                    size:10
                },
                isCollected: false
            }
        },
        methods: {
            getDetail() {
                this.papa.post("index/detail", {
                    id: this.$route.query.id,
                    view: true
                }).then(data => {
                    this.detail = data;
                }).catch(() => {

                });
            },
            getCollect() {
                this.papa.postNoErr("users/isCollect", {
                    id: this.$route.query.id
                }).then(data => {
                    if (data.data === 1) {
                        this.isCollected = true;
                    } else {
                        this.isCollected = false;
                    }
                }).catch(() => {

                });
            },
            collect() {
                if (!this.user.isLogin) {
                    this.$emit("login");
                    return;
                }
                this.papa.post("users/collect", {
                    id: this.$route.query.id
                }).then(data => {
                    this.papa.tip(data);
                    this.getCollect();
                }).catch(() => {

                });
            },
            getComments(){
                this.papa.post("article/comments",this.search).then(data => {
                    this.comments = data;
                }).catch(err => {

                });
            },
            setPage(num){
                this.search.page = num;
                this.getComments();
            }
        },
        mounted() {
            this.getDetail();
            this.getCollect();
            this.getComments();
        }
    }
</script>