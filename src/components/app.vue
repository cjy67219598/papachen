<template>
    <div class="index">
        <Menu mode="horizontal" theme="dark" active-name="home" @on-select="menu">
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
                <Button type="text">注册</Button>
            </div>
        </Menu>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            menu(name){
                this.$router.push({
                    name:name
                });
            }
        },
        mounted(){

        }
    }
</script>