<template>
    <div class="register">
        <Collapse v-model="value1">
            <Panel name="tab1">
                &nbsp;基本信息
                <div slot="content">
                    <Form ref="form" :model="form" :rules="rules" :label-width="80" class="form">
                        <FormItem prop="nickname" label="昵称">
                            <Input v-model.trim="form.nickname" placeholder="请输入昵称">
                            </Input>
                        </FormItem>
                        <FormItem label="性别">
                            <RadioGroup v-model="form.sex">
                                <Radio :label="1">男</Radio>
                                <Radio :label="0">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem prop="tel" label="手机">
                            <Input v-model.trim="form.tel" placeholder="请输入手机号">
                            </Input>
                        </FormItem>
                        <FormItem prop="email" label="邮箱">
                            <Input v-model.trim="form.email" placeholder="请输入邮箱">
                            </Input>
                        </FormItem>
                        <div class="text-center">
                            <Button type="primary" :loading="loading" @click.native="handleSubmit('form')">
                                <span v-if="!loading">提交</span>
                                <span v-else>Loading...</span>
                            </Button>
                        </div>
                    </Form>
                </div>
            </Panel>
            <Panel name="tab2">
                &nbsp;安全设置
                <div slot="content">
                    <Form ref="form2" :model="form2" :rules="rules2" :label-width="90" class="form">
                        <FormItem prop="oldPassword" label="旧密码">
                            <Input type="password" v-model="form2.oldPassword" placeholder="请输入旧密码">
                            </Input>
                        </FormItem>
                        <FormItem prop="newPassword" label="新密码">
                            <Input type="password" v-model="form2.newPassword" placeholder="请输入新密码">
                            </Input>
                        </FormItem>
                        <FormItem prop="rePassword" label="确认新密码">
                            <Input type="password" v-model="form2.rePassword" placeholder="请再次确认新密码">
                            </Input>
                        </FormItem>
                        <div class="text-center">
                            <Button type="primary" :loading="loading2" @click.native="handleSubmit2('form2')">
                                <span v-if="!loading2">保存</span>
                                <span v-else>Loading...</span>
                            </Button>
                        </div>
                    </Form>
                </div>
            </Panel>
        </Collapse>
    </div>
</template>
<script>
    export default {
        data() {
            let _this = this;
            return {
                value1:["tab1"],
                loading: false,
                loading2: false,
                form: {
                    nickname: "",
                    email: "",
                    tel: "",
                    introduction: "",
                    sex: 1
                },
                form2: {
                    oldPassword: "",
                    newPassword: "",
                    rePassword:""
                },
                rules: {
                    nickname: [{//昵称
                        required: true,
                        message: "请填写昵称",
                        trigger: "blur"
                    }, {
                        validator(rule, value, callback, source, options) {
                            if (/^.{1,15}$/.test(value)) return callback();
                            return callback(new Error("昵称最多15字"));
                        }
                    }],
                    tel: [{//手机号
                        validator(rule, value, callback, source, options) {
                            if (/^1[34578]\d{9}$/.test(value) || value === "") return callback();
                            return callback(new Error("请输入正确的手机号"));
                        }
                    }],
                    email: [{//邮箱
                        validator(rule, value, callback, source, options) {
                            if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value) || value === "") return callback();
                            return callback(new Error("请输入正确的邮箱"));
                        }
                    }]
                },
                rules2: {
                    oldPassword: [
                        { required: true, message: "请填写原始密码", trigger:"blur" },
                        { type: "string", max: 30, message:"原始密码长度错误", trigger: "blur" }
                    ],
                    newPassword: [{//密码验证
                        required: true,
                        message: "请填写密码",
                        trigger: "blur"
                    }, {
                        validator(rule, value, callback, source, options) {
                            if (/^[a-zA-Z0-9_]{5,17}$/.test(value)) return callback();
                            return callback(new Error("密码只能包含字母、数字、下划线，5-17位"));
                        }
                    }],
                    rePassword: [{//重复密码
                        required: true,
                        message: "请再次输入密码",
                        trigger: "blur"
                    }, {
                        validator(rule, value, callback, source, options) {
                            if (_this.form2.newPassword === value) return callback();
                            return callback(new Error("两次密码输入不一致"));
                        }
                    }]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        let obj = {};
                        for (let i in this.form) {
                            if (this.form[i] !== "") obj[i] = this.form[i];
                        }
                        this.loading = true;
                        this.papa.post("users/edit", obj).then(data => {
                            this.papa.tip(data);
                            this.getUserInfo();
                        }).catch(() => {

                        }).finally(() => {
                            this.loading = false;
                        });
                    }
                });
            },
            handleSubmit2(name){
                this.$refs[name].validate(valid => {
                    if(valid){
                        this.papa.post("users/rePassword",this.form2).then(data => {
                            this.papa.tip(data);
                            this.form2 = {
                                oldPassword: "",
                                newPassword: "",
                                rePassword:""
                            };
                            let i = 0;
                            for(;i < this.value1.length;i++){
                                if(this.value1[i] === "tab2"){
                                    this.value1.splice(i,1);
                                    break;
                                }
                            }
                        }).catch(err => {

                        });
                    }
                });
            },
            getUserInfo() {
                this.papa.post("users/userInfo", {}).then(data => {
                    typeof data.data.nickname !== "undefined" && (this.form.nickname = data.data.nickname);
                    typeof data.data.email !== "undefined" && (this.form.email = data.data.email);
                    typeof data.data.tel !== "undefined" && (this.form.tel = data.data.tel);
                    typeof data.data.introduction !== "undefined" && (this.form.introduction = data.data.introduction);
                    typeof data.data.sex !== "undefined" && (this.form.sex = data.data.sex);
                }).catch(err => {

                });
            }
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>