<template>
    <div class="personal">
        <Menu theme="light" :active-name="activeName" @on-select="menu">
            <div class="head-box">
                <Upload action="/users/upload" :max-size="5120" accept="image/*" :on-success="upload" name="image" :show-upload-list="false" :before-upload="beforeUpload" :on-error="errorUpload">
                    <div class="head" v-if="user.headImg">
                        <img :src="user.headImg" :title="user.nickname">
                    </div>
                    <div class="head" v-if="!user.headImg">
                        <Icon type="person" size="30"></Icon>
                    </div>
                </Upload>
                <span class="person-name">{{user.nickname}}</span>
            </div>
            <MenuGroup title="个人中心">
                <MenuItem name="myArticlesList">
                    <Icon type="document-text"></Icon>
                    我的博客
                </MenuItem>
                <MenuItem name="collections">
                    <Icon type="ios-paw"></Icon>
                    我的收藏
                </MenuItem>
                <MenuItem name="comments">
                    <Icon type="bowtie"></Icon>
                    最新评论
                    &nbsp;<Badge :count="unRead" v-if="unRead > 0"></Badge>
                </MenuItem>
                <MenuItem name="myComments">
                    <Icon type="chatbubble-working"></Icon>
                    我的评论
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="账号管理">
                <MenuItem name="account">
                    <Icon type="settings"></Icon>
                    安全中心
                </MenuItem>
            </MenuGroup>
        </Menu>
        <router-view class="personal-children"></router-view>
    </div>
</template>
<script>
    export default {
        props:["user"],
        data(){
            let _this = this;
            return {
                upload(response, file, fileList){
                    _this.papa.tip(response);
                    if(response.msg.status === 1){
                        _this.$emit("on-user");
                        _this.$Loading.finish();
                    }else{
                        _this.$Loading.error();
                    }
                },
                beforeUpload(file){
                    _this.$Loading.start();
                },
                errorUpload(error, file, fileList){
                    this.$Message.error({
                        content:error.message
                    });
                    _this.$Loading.error();
                },
                activeName:this.$route.name,
                unRead:0
            }
        },
        methods:{
            menu(name) {
                this.$router.push({
                    name: name
                });
            },
            commentCount(){
                this.papa.post("users/unRead",{}).then(data => {
                    this.unRead = data.data;
                }).catch(err => {

                });
            }
        },
        watch:{
          $route(to,fro){
              this.activeName = to.name;
          }
        },
        mounted(){
            this.commentCount();
        }
    }
</script>