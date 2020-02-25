<template>
    <div style="margin-left:40px;width:900px">
        <h3 style="display:inline-block">我的关注</h3><span class="total">共 {{total}} 人</span>
        <div id="follshow" v-for="(item,index) in followMap" :key="index">
        <el-divider></el-divider>
        <span class="circleImg"><img :src="item.icon"  /></span>
        <span >{{item.id}}</span>
        <el-button  :type="btntype" @click="handledelfollow(item.id,$event)" style="float:right">{{btnname}}</el-button>
        </div>
    </div>
    
</template>
<script>
import InfoApi from '@/api/user'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{ 
            followMap:[],
            total:"999+",
            btnname:'取消关注',
            btntype:'' //danger

        }
    },
    computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
    created(){
        this.fetchdata(this.name)
    },
    methods:{
        fetchdata(name){
            InfoApi.getFollowList(name).then(res=>{
            this.followMap = res.data.fanlist
            this.total = res.data.fanlist.length
            })
        },
        handledelfollow(target,e){
            console.log(e.target.innerHTML);
            if(e.target.innerHTML=='取消关注' || e.target.innerHTML=="<!----><!----><span>取消关注</span>"){
            InfoApi.unfollow(target).then(res=>{
            if(res.code == 20000){
                this.handlebutton(e)
            this.$message({
            type: 'success',
            message: '提交完成'
          });
                }
            else{
            this.$message({
            type: 'info',
            message: '取消成功'
          });    
                }
            })
        }
        else{
            InfoApi.follow(target).then(res=>{
            if(res.code == 20000){
                this.handlebutton(e)
            this.$message({
            type: 'success',
            message: '提交完成'
          });
                }
            else{
            this.$message({
            type: 'info',
            message: '取消成功'
          });    
                }
            })
        }
        },


        
        handlebutton(e){
            var e = e || window.event;
            var target = e.target || e.srcElement;
            

            //绑定事件处理函数
            if(target.innerHTML=="取消关注"){
                if(target.nodeName.toLowerCase() === 'span'){target = target.parentElement; }
                if(target.nodeName.toLowerCase() === 'button') {
                        target.innerHTML = "关注"
                        target.style.color = "#FFF"
                        target.style.backgroundColor= "#F56C6C";
                        target.style.borderColor="#F56C6C";
                }
            }
            else if(target.innerHTML=="<!----><!----><span>取消关注</span>"){
                if(target.nodeName.toLowerCase() === 'button') {
                        target.innerHTML = "关注"
                        target.style.color = "#FFF"
                        target.style.backgroundColor= "#F56C6C";
                        target.style.borderColor="#F56C6C";
                }
            }
            else if(target.innerHTML=="关注"){
                if(target.nodeName.toLowerCase() === 'span'){target = target.parentElement; }
                if(target.nodeName.toLowerCase() === 'button') {
                        target.innerHTML = "取消关注"
                        target.style.color = "#606266"
                        target.style.backgroundColor= "#FFF";
                        target.style.border="1px solid #DCDFE6";
                }
            }
            else if(target.innerHTML=="<!----><!----><span>关注</span>"){
                if(target.nodeName.toLowerCase() === 'button') {
                        target.innerHTML = "关注"
                        target.style.color = "#606266"
                        target.style.backgroundColor= "#FFF";
                        target.style.border="1px solid #DCDFE6";
                }
            }

        }


        
    }

    
    
}
</script>
<style>
    .circleImg{
    margin: 20px 8px 20px 0 ;
    vertical-align: middle;
    }
    .circleImg img{
    border-radius: 30px;
    width:50px;
    height:50px;
    }
    .total{
        font-size: small;
        margin-left: 50px;
    }
</style>