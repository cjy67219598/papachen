<template>
    <div class="index">
        <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="menu">
            <MenuItem name="home">
                <Icon type="home"></Icon>
                首页
            </MenuItem>
            <MenuItem name="2">
                <Icon type="thumbsup"></Icon>
                热门
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-paw"></Icon>
                收藏
            </MenuItem>
            <MenuItem name="4">
                <Icon type="person"></Icon>
                我的
            </MenuItem>
            <div class="index-rt">
                <Button type="text">登录</Button>
                <router-link to="/register">
                    <Button type="text">注册</Button>
                </router-link>
            </div>
        </Menu>
        <router-view class="main-view"></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                activeName:"home"
            }
        },
        methods:{
            menu(name){
                this.$router.push({
                    name:name
                });
            }
        },
        watch:{
          $route(to,fro){
              this.$nextTick(() => {
                  this.activeName = to.name;
              });
          }
        },
        mounted(){
            this.activeName = this.$route.name;
        }
    }
</script>