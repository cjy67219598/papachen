<template>
    <Row>
        <Col span="16">
            <div class="hot">
                <div class="my-articles-list">
                    <div class="list">
                        <Card class="item" v-for="(val,key) in list.data" :key="key">
                            <p class="title">
                                <router-link :to="'/detail?id=' + val._id">{{val.title}}</router-link>
                            </p>
                            <p class="intro">
                                <span>{{val.intro}}</span>
                            </p>
                            <p class="time">
                                <Icon type="ios-clock-outline"></Icon>&nbsp;<span>{{papa.time(val.updateTime,1)}}</span>
                                &nbsp;
                                <span class="author">作者：{{val.user.nickname}}</span>
                            </p>
                            <div slot="extra">
                                <Icon type="eye"></Icon>&nbsp;
                                {{val.counts}}
                            </div>
                        </Card>
                    </div>
                    <papa-empty msg="抱歉，暂无数据~" v-if="list.data.length === 0"></papa-empty>
                </div>
                <Page :total="list.page.count" :page-size="search2.size" :current="list.page.page" show-elevator @on-change="setPage" v-if="list.page.count > search2.size"></Page>
            </div>
        </Col>
        <Col span="8" style="padding:50px 50px;">
            <Input v-model.trim="keywords" icon="search" placeholder="请输入关键字进行搜索" style="margin:0 0 20px 0;" @keydown.native.enter="setKeywords()"></Input>
            <Card>
                <p slot="title">
                    <Icon type="document"></Icon>&nbsp;
                    最新博客
                </p>
                <a href="#" slot="extra" @click.prevent="changeNext()">
                    <Icon type="ios-loop-strong"></Icon>
                    换一换
                </a>
                <papa-empty v-if="list2.page.count === 0"></papa-empty>
                <ul>
                    <li v-for="(val,key) in list2.data" class="lastest-item">
                        <router-link :to="'/detail?id=' + val._id" :title="val.title">{{val.title}}</router-link>
                        <span :title="val.nickname">
                            {{val.user.nickname}}
                        </span>
                    </li>
                </ul>
            </Card>
        </Col>
    </Row>
</template>
<script>
    export default {
        data(){
            return {
                list:{
                    page:{},
                    data:[]
                },
                list2:{
                    page:{},
                    data:[]
                },
                search:{
                    page:1,
                    size:10
                },
                search2:{
                    page:1,
                    size:10
                },
                keywords:""
            }
        },
        methods:{
            getHot(){
                this.papa.post("index/hot",this.search2).then(data => {
                    this.list = data;
                }).catch(() => {

                });
            },
            setPage(num){
              this.search2.page = num;
              this.getHot();
            },
            getLatest(){
                this.papa.post("index/latest",this.search).then(data => {
                    this.list2 = data;
                }).catch(() => {

                });
            },
            changeNext(){
                if(this.list.page.totalPage > this.list.page.page){
                    this.search.page ++;
                }else{
                    this.search.page = 1;
                }
                this.getLatest();
            },
            setKeywords(){
                this.search2.keywords = this.keywords;
                this.getHot();
            }
        },
        mounted(){
            this.getHot();
            this.getLatest();
        }
    }
</script>