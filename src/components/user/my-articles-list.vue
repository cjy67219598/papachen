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
                </div>
            </Card>
        </div>
        <Page :total="list.page.count" :page-size="search.size" :current="list.page.page" show-elevator @on-change="setPage" v-if="list.page.count > search.size"></Page>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                search:{
                    page:1,
                    size:2
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
            edit(id){
                this.$router.push({
                    name:"article",
                    query:{
                        id:id
                    }
                });
            }
        },
        mounted(){
            this.getList();
        }
    }
</script>