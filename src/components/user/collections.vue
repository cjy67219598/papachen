<template>
    <div class="collections">
        <h1>
            <Icon type="social-twitch"></Icon>&nbsp;<span>我的收藏</span>
        </h1>
        <Input v-model.trim="keywords" icon="search" placeholder="请输入关键字进行搜索" style="margin:0 0 20px 0;" @keydown.native.enter="setKeywords()"></Input>
        <div class="my-articles-list">
            <div class="list">
                <Card class="item" v-for="(val,key) in list.data" :key="key">
                    <p class="title"><router-link :to="'/detail?id=' + val._id">{{val.title}}</router-link></p>
                    <p class="intro">
                        <span>{{val.intro}}</span>
                    </p>
                    <p class="time">
                        <span>{{papa.time(val.updateTime,1)}}</span>
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
            <papa-empty msg="抱歉，暂无数据~" v-if="list.data.length === 0"></papa-empty>
        </div>
        <Page :total="list.page.count" :page-size="search.size" :current="list.page.page" show-elevator @on-change="setPage" v-if="list.page.count > search.size"></Page>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:{
                    page:{},
                    data:[]
                },
                search:{
                    page:1,
                    size:5,
                    keywords:""
                },
                keywords:""
            }
        },
        methods:{
            getList(){
                this.papa.post("users/collections",this.search).then(data => {
                    this.list = data;
                }).catch(err => {

                });
            },
            del(id){
                this.papa.post("users/collect",{id:id}).then(data => {
                    this.papa.tip(data);
                    this.getList();
                }).catch(err => {

                });
            },
            setKeywords(){
                this.search.keywords = this.keywords;
                this.getList();
            }
        },
        mounted(){
            this.getList();
        }
    }
</script>