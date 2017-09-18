<template>
    <div>
        <Card class="article-detail">
            <Icon :type="isCollected ? 'android-star' : 'android-star-outline'" class="collect" size="22" title="点击收藏" @click.native="collect()"></Icon>
            <div class="title">
                <h3>{{detail.data.title}}</h3>
            </div>
            <div class="intro">简介：{{detail.data.intro}}</div>
            <div class="time">
                <Icon type="ios-clock-outline"></Icon>&nbsp;{{papa.time(detail.data.createTime,1)}}
                &nbsp;&nbsp;&nbsp;
                <Icon type="ios-eye" size="18"></Icon>&nbsp;{{detail.data.counts}}
                &nbsp;&nbsp;&nbsp;
                <Icon type="person"></Icon>&nbsp;{{detail.data.user.nickname}}
            </div>
            <div v-html="detail.data.content"></div>
        </Card>
    </div>
</template>
<script>
    export default{
        props:["user"],
        data(){
            return {
                detail:{
                    data:{
                        user:{}
                    }
                },
                isCollected:false
            }
        },
        methods:{
            getDetail(){
                this.papa.post("index/detail",{
                    id:this.$route.query.id,
                    view:true
                }).then(data => {
                    this.detail = data;
                }).catch(() => {

                });
            },
            getCollect(){
                this.papa.postNoErr("users/isCollect",{
                    id:this.$route.query.id
                }).then(data => {
                    if(data.data === 1){
                        this.isCollected = true;
                    }else{
                        this.isCollected = false;
                    }
                }).catch(() => {

                });
            },
            collect(){
                if(!this.user.isLogin){
                    this.$emit("login");
                    return;
                }
                this.papa.post("users/collect",{
                    id:this.$route.query.id
                }).then(data => {
                    this.papa.tip(data);
                    this.getCollect();
                }).catch(() => {

                });
            }
        },
        mounted(){
            this.getDetail();
            this.getCollect();
        }
    }
</script>