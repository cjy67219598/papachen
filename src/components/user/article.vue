<template>
    <div class="article">
        <Form ref="form" :model="form" label-position="right" :rules="rules" :label-width="100">
            <FormItem label="标题" prop="title">
                <Input v-model="form.title" placeholder="请输入博客标题"></Input>
            </FormItem>
            <FormItem label="简介" prop="intro">
                <Input v-model="form.intro" placeholder="请输入博客简介"></Input>
            </FormItem>
            <FormItem label="是否公开">
                <i-switch v-model="form.hidden" size="large">
                    <span slot="open">私人</span>
                    <span slot="close">公开</span>
                </i-switch>
            </FormItem>
        </Form>
        <div class="editor-box">
            <div class="label">内容</div>
            <div class="editor" ref="article"></div>
        </div>
        <div class="text-center save">
            <Button type="primary" :loading="loading" @click.native="handleSubmit('form')" size="large" long>
                <span v-if="!loading">保存</span>
                <span v-else>Loading...</span>
            </Button>
        </div>
    </div>
</template>
<script>
    import Wang from "wangeditor";
    export default {
        data(){
            return {
                wangEditor:"",
                form:{
                    title:"",
                    intro:"",
                    content:"",
                    hidden:false
                },
                rules:{
                    title:[{
                        required:true,
                        message:"请填写博客标题",
                        trigger:"blur"
                    },{
                        type:"string",
                        max:30,
                        message:"长度不能超过30字"
                    }],
                    intro:[{
                        type:"string",
                        max:100,
                        message:"长度不能超过100字"
                    }]
                },
                loading:false
            }
        },
        methods:{
            editor(){
                this.wangEditor = new Wang(this.$refs["article"]);
                this.wangEditor.customConfig.uploadImgServer = "/article/upload";
                this.wangEditor.customConfig.uploadFileName = "image";
                this.wangEditor.create();
            },
            handleSubmit(name){
                this.$refs[name].validate(valid => {
                    if(valid){
                        if(this.wangEditor.txt.text().length > 10000){
                            this.$Message.warning({
                                content:"内容不能超过10000字"
                            });
                        }
                        this.loading = true;
                        let obj = {}
                        obj.content = this.wangEditor.txt.html();
                        for(let i in this.form){
                            this.form[i] !== "" && (obj[i] = this.form[i]);
                        }
                        this.papa.post("article/save",obj).then((data) => {
                            this.papa.tip(data);
                            this.$router.push({
                                name:"personal"
                            });
                        }).catch(() => {

                        }).finally(() => {
                            this.loading = false;
                        });
                    }
                });
            },
            getDetail(){
                if(!this.$route.query.id) return;
                this.papa.post("index/detail",{
                    id:this.$route.query.id
                }).then(data => {
                    this.form.title = data.data.title;
                    this.form.intro = data.data.intro;
                    this.form.hidden = data.data.hidden;
                    this.wangEditor.txt.html(data.data.content);
                }).catch(() => {

                });
            }
        },
        mounted(){
            this.editor();
            this.getDetail();
        }
    }
</script>