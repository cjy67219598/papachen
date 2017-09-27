<template>
    <div class="index">
        <Menu mode="horizontal" theme="primary" active-name="home">
            <router-link to="/home">
                <MenuItem name="home">
                    <Icon type="home" size="18"></Icon>
                    首页
                </MenuItem>
            </router-link>
            <router-link to="/hot">
                <MenuItem name="hot">
                    <Icon type="thumbsup" size="18"></Icon>
                    热门
                </MenuItem>
            </router-link>
            <router-link to="/personal">
                <MenuItem name="personal">
                    <Icon type="person" size="18"></Icon>
                    我的
                </MenuItem>
            </router-link>
            <div class="index-rt" v-if="!userInfo.isLogin">
                <Button type="text" @click.native="login()">登录</Button>
                <router-link to="/register">
                    <Button type="text">注册</Button>
                </router-link>
            </div>
            <div class="index-rt" v-if="userInfo.isLogin" @click="$router.push({name:'personal'})">
                <Poptip placement="bottom" trigger="hover">
                    <Avatar v-if="!userInfo.headImg" class="user-head" icon="person" size="large" />
                    <Avatar v-if="userInfo.headImg" class="user-head" :src="userInfo.headImg" size="large" />
                    <div slot="content">
                        <Button type="text" long style="color:#000;" @click.native="signOut()">退出登陆</Button>
                    </div>
                </Poptip>
                <span class="user-name">{{userInfo.nickname}}</span>
            </div>
        </Menu>
        <router-view class="main-view" @login="login()" :user="userInfo" @on-user="isLogin()"></router-view>
        <BackTop></BackTop>
        <Modal v-model="modal1" :closable="true" width="300">
            <div slot="header">
                <Icon type="person" size="16"></Icon>
                用户登录
            </div>
            <Form ref="form" :model="form" :rules="rules">
                <FormItem prop="username">
                    <Input type="text" v-model="form.username" placeholder="请输入用户名"
                           @keydown.enter.native="loginSubmit('form')">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="form.password" placeholder="请输入密码"
                           @keydown.enter.native="loginSubmit('form')">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" long size="large" @click.native="loginSubmit('form')" :loading="loading">
                    <span v-if="loading">Loading...</span>
                    <span v-if="!loading">登陆</span>
                </Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: "home",
                form: {
                    username: "",
                    password: ""
                },
                userInfo: {
                    nickname: "",
                    headImg: ""
                },
                loading: false,
                rules: {
                    username: [{//用户名验证
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }, {
                        validator(rule, value, callback, source, options) {
                            if (/^[a-zA-z][a-zA-Z0-9_]{4,14}$/.test(value)) return callback();
                            callback(new Error("请输入正确格式的用户名"));
                        }
                    }],
                    password: [{//密码验证
                        required: true,
                        message: "请填写密码",
                        trigger: "blur"
                    }, {
                        validator(rule, value, callback, source, options) {
                            if (/^[a-zA-Z0-9_]{5,17}$/.test(value)) return callback();
                            return callback(new Error("请输入正确格式的密码"));
                        }
                    }]
                },
            }
        },
        methods: {
            login() {
                this.modal1 = true;
            },
            loginSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.papa.post("users/login", this.form).then((data) => {
                            this.papa.tip(data);
                            this.modal1 = false;
                            window.location.reload();
                        }).catch(() => {

                        }).finally(() => {
                            this.loading = false;
                        });
                    }
                });
            },
            isLogin(model){
                this.papa.postNoErr("users/isLogin",{}).then(data => {
                    if(data.msg.status === 1){
                        data.data.isLogin = true;
                        data.data.headImg && (data.data.headImg += "?_=" + new Date().getTime());
                        this.userInfo = data.data;
                        this.userInfoStore = data.data;
                    }else{
                        this.userInfo.isLogin = false;
                        this.userInfoStore = {
                            nickname: "",
                            headImg: "",
                            isLogin:false
                        };
                        if(this.$route.matched.some(record => record.meta.auth)){
                            this.$router.push({
                                name:"home"
                            });
                            if(!model) this.login();
                        }
                    }
                }).catch(() => {
                    this.userInfo.isLogin = false;
                    this.userInfoStore = {
                        nickname: "",
                        headImg: "",
                        isLogin:false
                    };
                });
            },
            signOut(){
                this.$Modal.confirm({
                    title:"提示",
                    content:"确定退出?",
                    onOk: () => {
                        this.out();
                    },
                    onCancel: () => {

                    }
                });
            },
            out(){
                this.papa.post("users/signOut",{}).then(data => {
                    this.papa.tip(data);
                    window.location.reload();
                }).catch(() => {

                });
            },
        },
        computed:{
            modal1:{
                get(){
                    return this.$store.state.loginModal;
                },
                set(val){
                    this.$store.commit("login",val);
                }
            },
            userInfoStore:{
                get(){
                    return this.$store.state.userInfoStore;
                },
                set(val){
                    this.$store.commit("setUserInfo",val);
                }
            }
        },
        mounted() {
            this.isLogin();
        }
    }
</script>