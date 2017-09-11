<template>
    <Row>
        <Col span="16">
            <div class="hot">
                <div class="my-articles-list">
                    <div class="list">
                        <Card class="item" v-for="(val,key) in list.data" :key="key">
                            <p class="title">
                                <router-link to="/detail">{{val.title}}</router-link>
                            </p>
                            <p class="intro">
                                <span>{{val.intro}}</span>
                            </p>
                            <p class="time">
                                <span>{{papa.time(val.updateTime,1)}}</span>
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
            </div>
        </Col>
        <Col span="8" style="padding:50px 50px;">
            <Card>
                <p slot="title">
                    <Icon type="document"></Icon>&nbsp;
                    最新博客
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-loop-strong"></Icon>
                    换一换
                </a>
                <ul>
                    <li v-for="(val,key) in list2.data" class="lastest-item">
                        <a :href="val.url" :title="val.title">{{ val.title }}</a>
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
                }
            }
        },
        methods:{
            getHot(){
                this.papa.post("index/hot",{}).then(data => {
                    this.list = data;
                }).catch(() => {

                });
            },
            getLatest(){
                this.papa.post("index/latest",this.search).then(data => {
                    this.list2 = data;
                }).catch(() => {

                });
            }
        },
        mounted(){
            this.getHot();
            this.getLatest();
        }
    }
</script>