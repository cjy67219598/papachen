<template>
    <div class="register">
        <Form ref="form" :model="form" :rules="rules" :label-width="80" class="form">
            <FormItem prop="user" label="用户名">
                <Input v-model="form.user" placeholder="请输入用户名">
                </Input>
            </FormItem>
            <FormItem prop="password" label="密码">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                </Input>
            </FormItem>
            <FormItem prop="rePassword" label="确认密码">
                <Input type="password" v-model="form.rePassword" placeholder="请再次确认密码">
                </Input>
            </FormItem>
            <FormItem prop="nickname" label="昵称">
                <Input v-model="form.nickname" placeholder="请输入昵称">
                </Input>
            </FormItem>
            <FormItem prop="tel" label="手机">
                <Input v-model="form.tel" placeholder="请输入手机号">
                </Input>
            </FormItem>
            <FormItem prop="email" label="邮箱">
                <Input v-model="form.email" placeholder="请输入邮箱">
                </Input>
            </FormItem>
            <div class="text-center">
                <Button type="primary" @click.native="handleSubmit('form')">提交</Button>
            </div>
        </Form>
    </div>
</template>
<script>
    export default {
        data(){
            let _this = this;
            return {
                form:{
                    user:"",
                    password:"",
                    rePassword:"",
                    nickname:"",
                    email:"",
                    tel:"",
                    introduction:""
                },
                rules:{
                    user:[{//用户名验证
                        required:true,
                        message:"请填写用户名",
                        trigger:"blur",

                    },{
                        validator(rule, value, callback, source, options){
                            if(/^[a-zA-z][a-zA-Z0-9_]{4,14}$/.test(value)) return callback();
                            return callback(new Error("用户名必须字母开头，包含字母、数字、下划线，5-15位"));
                        }
                    }],
                    password:[{//密码验证
                        required:true,
                        message:"请填写密码",
                        trigger:"blur"
                    },{
                        validator(rule, value, callback, source, options){
                            if(/^[a-zA-Z0-9_]{5,17}$/.test(value)) return callback();
                            return callback(new Error("密码只能包含字母、数字、下划线，5-17位"));
                        }
                    }],
                    rePassword:[{//重复密码
                        required:true,
                        message:"请再次输入密码",
                        trigger:"blur"
                    },{
                        validator(rule, value, callback, source, options){
                            if(_this.form.password === value) return callback();
                            return callback(new Error("两次密码输入不一致"));
                        }
                    }],
                    nickname:[{//昵称
                        required:true,
                        message:"请填写昵称",
                        trigger:"blur"
                    },{
                        validator(rule, value, callback, source, options){
                            if(/^.{1,15}$/.test(value)) return callback();
                            return callback(new Error("昵称最多15字"));
                        }
                    }],
                    tel:[{//手机号
                        validator(rule, value, callback, source, options){
                            if(/^1[34578]\d{9}$/.test(value) || value === "") return callback();
                            return callback(new Error("请输入正确的手机号"));
                        }
                    }],
                    email:[{//邮箱
                        validator(rule, value, callback, source, options){
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value) || value === "") return callback();
                            return callback(new Error("请输入正确的邮箱"));
                        }
                    }]
                }
            }
        },
        methods:{
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            }
        },
        mounted(){

        }
    }
</script>