<template>
    <div class="user-comments my-articles-list">
        <h1 class="common-title">
            <Icon type="chatbubble-working"></Icon>&nbsp;<span>我的评论</span>
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
                <div slot="extra">
                    <Poptip
                            confirm
                            title="确定删除?"
                            @on-ok="del(val._id)"
                            ok-text="确定"
                            cancel-text="取消"
                            placement="left">
                        <Button type="error">删除</Button>
                    </Poptip>
                </div>
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
                this.papa.post("users/myComments",this.search).then(data => {
                    this.comments = data;
                }).catch(err => {

                });
            },
            setPage(num){
                this.search.page = num;
                this.getComments();
            },
            del(id){
                this.papa.post("article/delComment",{
                    id:id
                }).then(data => {
                    this.papa.tip(data);
                    this.getComments();
                }).catch(err => {

                });
            }
        },
        mounted(){
            this.getComments();
        }
    }
</script>