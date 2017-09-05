<template>
    <div class="index">
        <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="menu">
            <MenuItem name="home">
                <Icon type="home" size="18"></Icon>
                首页
            </MenuItem>
            <MenuItem name="2">
                <Icon type="thumbsup" size="18"></Icon>
                热门
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-paw" size="18"></Icon>
                收藏
            </MenuItem>
            <MenuItem name="4">
                <Icon type="person" size="18"></Icon>
                我的
            </MenuItem>
            <div class="index-rt">
                <Button type="text" @click.native="login()">登录</Button>
                <router-link to="/register">
                    <Button type="text">注册</Button>
                </router-link>
            </div>
            <div class="index-rt">
                <Avatar class="user-head" icon="person"/>
            </div>
        </Menu>
        <router-view class="main-view" @login.native="login()"></router-view>
        <Modal v-model="modal1" :closable="false" width="300">
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
                modal1: false,
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
            menu(name) {
                this.$router.push({
                    name: name
                });
            },
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
                        }).catch(() => {

                        }).finally(() => {
                            this.loading = false;
                        });
                    }
                });
            }
        },
        watch: {
            $route(to, fro) {
                this.$nextTick(() => {
                    this.activeName = to.name;
                });
            }
        },
        mounted() {
            this.activeName = this.$route.name;
        }
    }
</script>