<template>
    <div class="my-articles-list">
        <div class="add">
            <router-link to="/personal/article">
                <Button type="primary">
                    发表新博客
                </Button>
            </router-link>
        </div>
        <div class="list">
            <Card class="item" v-for="(val,key) in list.data" :key="key">
                <p class="title">{{val.title}}</p>
                <p class="intro">
                    <span>{{val.intro}}</span>
                </p>
                <p class="time">
                    <span>{{papa.time(val.updateTime,1)}}</span>
                </p>
                <div slot="extra">
                    <Button type="text" @click.native="edit(val._id)">编辑</Button>
                    <Button type="error" @click.native="del(val._id)">删除</Button>
                </div>
            </Card>
        </div>
        <papa-empty msg="您还没有发表过博客呦~" v-if="list.page.count === 0"></papa-empty>
        <Page :total="list.page.count" :page-size="search.size" :current="list.page.page" show-elevator @on-change="setPage" v-if="list.page.count > search.size"></Page>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                search:{
                    page:1,
                    size:6
                },
                list:{
                    page:{},
                    data:[]
                }
            }
        },
        methods:{
            getList(){
                this.papa.post("article/list",this.search).then((data) => {
                    this.list = data;
                }).catch(() => {

                });
            },
            setPage(num){
                this.search.page = num;
                this.getList();
            },
            edit(id) {
                this.$router.push({
                    name: "article",
                    query: {
                        id: id
                    }
                });
            },
            del(id){
                this.$Modal.confirm({
                    title: "警告",
                    content: "删除后不可恢复呦~",
                    onOk: () => {
                        this.papa.post("article/del",{
                            id:id
                        }).then((data) => {
                            this.papa.tip(data);
                            this.getList();
                        }).catch(() => {

                        });
                    },
                    onCancel: () => {

                    }
                });
            }
        },
        mounted(){
            this.getList();
        }
    }
</script>