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
            <papa-empty msg="还没有人评论呦~" v-if="comments.data.length === 0"></papa-empty>
            <div>
                <div class="comments-list" v-for="(val,key) in comments.data">
                    <Avatar :src="val.user.headImg" /><span class="c-time">{{val.user.nickname}}&nbsp;&nbsp;发表于：{{papa.time(val.createTime,1)}}</span>
                    <p>{{val.content}}</p>
                </div>
            </div>
            <Page :total="comments.page.count" :page-size="search.size" :current="comments.page.page" show-elevator @on-change="setPage" v-if="comments.page.count > search.size"></Page>
            <div class="comment-textarea">
                <Input v-model.trim="textarea" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="请输入评论内容"></Input>
            </div>
            <Button type="primary" @click.native="comment()" :loading="loading">
                <span v-if="!loading">发表</span>
                <span v-else>Loading...</span>
            </Button>
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
                    size:5
                },
                textarea:"",
                isCollected: false,
                loading:false
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
            },
            comment(){
                if(this.textarea === ""){
                    this.$Message.info({
                        content: "评论内容不能为空",
                        duration: 10,
                        closable:true
                    });
                    return;
                }
                if(this.textarea.length > 500){
                    this.$Message.info({
                        content: "评论字数不能超过500字",
                        duration: 10,
                        closable:true
                    });
                    return;
                }
                this.loading = true;
                this.papa.post("article/comment",{
                    id:this.$route.query.id,
                    content:this.textarea
                }).then(data => {
                    this.papa.tip(data);
                    this.textarea = "";
                    this.search.page = 1;
                    this.getComments();
                }).catch(err => {

                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.getDetail();
            this.getCollect();
            this.getComments();
        }
    }
</script>