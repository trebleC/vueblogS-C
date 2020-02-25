<template>
  <div id="navlist" class="navlist">
      <div class="header_nav">
        <router-link to="/home"><img src="https://pc.xiaoguo101.com/images/header_logo3.png" alt="logo" style="width:120px;"></router-link>
       <div class="tabbar_nav">
        <router-link to="/home/index"><span  :class="{active:curVal=='index'}">首页</span></router-link>
        <router-link to="/home/categories"><span  :class="{active:curVal=='categories'}">分类</span></router-link>
        <router-link to="/home/archives"><span  :class="{active:curVal=='archives'}">归档</span></router-link>
        <router-link to="/home/tags"><span   :class="{active:curVal=='tags'}">标签</span></router-link>
        <router-link to="/home/search"><span  :class="{active:curVal=='search'}">搜索</span></router-link>
       </div>
       <div class="info_nav">
         <div v-if="!token"><router-link to="/login"><span>登录 / 注册</span></router-link></div>
         <el-dropdown  v-else @command="handleCommand">
         <span class="action_info_nav">
           <span class="circleImg"><img src="../../../dist/static/img/head.53d48db.jpg"  /></span>
           <span>TrebleC</span>
           <i class="el-icon-arrow-down el-icon--right"></i>
         </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="follow"><i class="el-icon-star-off"></i>我的关注</el-dropdown-item>
              <el-dropdown-item command="star"><i class="el-icon-collection-tag"></i>我的收藏</el-dropdown-item>
              <el-dropdown-item command="info"><i class="el-icon-user"></i>个人中心</el-dropdown-item>
              <el-dropdown-item command="exit" divided><i class="el-icon-switch-button"></i>退出</el-dropdown-item>
            </el-dropdown-menu>
            
         </el-dropdown>
       </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    name: 'navlist',
    props:{
      curVal:String
    },
    data() {
      return {
        articleNumber: '',
      }
    },
    computed: {
      ...mapGetters([
      'token',
      'avatar',
      'name'
    ])},
    methods:{
      handleCommand(command){
        switch (command) {
          case "follow":
            alert('/my/follow')
            this.$router.push({path: '/my/follow'})
            break;
          case "star":
            this.$router.push({path: '/my/star'})
            break;
          case "info":
            this.$router.push({path: '/my/info'})

            break;
          case "exit":
            this.logout()
            break;
          default:
            this.$message('try again please');
            break;
        }
      },
      logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
    }
   
  }
</script>

<style>
 .navlist{
    padding: 0px;
    background-color: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
}
  
.header_nav{
  height: 50px;
  width: 1240px;
  position: relative;
  margin: auto;
}
.tabbar_nav{
    width: 410px;
    position: absolute;
    left: 626px;
    top: 10px;
    height: 43px;
    overflow: hidden;
}

 .tabbar_nav a{
    float: left;
    font-size: 14px;
    font-weight: bold;
    color: rgb(17, 17, 17);
    width: 20%;
 }
.nav_active:active{
  border-bottom: 2px solid #D92E2E;
  color: #222429;
  
}
.active{
  border-bottom: 2px solid #D92E2E;
  color: #222429;
  
}
/* .info_nav{
  position: absolute;
    right: 50px;
    top: 10px;
    height: 43px;
    overflow: hidden;
} */
.info_nav{
    position: absolute;
    right: 50px;
    top: 10px;
    height: 40px;
 
}
.info_nav span:hover{
  background-color:#ebdad0
}
.circleImg{
  margin: 20px 8px 20px 0 ;
  vertical-align: middle;
}
.circleImg img{
  border-radius: 30px;
  width:30px;
  height:30px;
}
.action_info_nav{
  font-size: 14px;
  cursor: pointer;
padding: 0 12px;
display: inline-block;
transition: all .3s;
height: 100%;
}
 </style>