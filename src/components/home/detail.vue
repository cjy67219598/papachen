<template>
    <div>
        <Card class="article-detail">
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
        data(){
            return {
                detail:{
                    data:{
                        user:{}
                    }
                }
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
            }
        },
        mounted(){
            this.getDetail();
        }
    }
</script>