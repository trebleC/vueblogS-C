<template>
    <div style="margin-left:40px;width:900px">
        <h3 style="display:inline-block">我的粉丝</h3><span class="totalfan">共 {{totalfan}} 人</span>
        <div v-for="(item,index) in fanMap" :key="index">
        <el-divider></el-divider>
        <span class="circleImg"><img :src="item.icon"  /></span>
        <span >{{item.id}}</span>
        <el-button @click="handledelfan(item.id)" style="float:right">删除</el-button>
        </div>
    </div>
    
</template>
<script>
import InfoApi from '@/api/user'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{ 
            fanMap:[],
            totalfan:"999+"
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
            InfoApi.getFanList(name).then(res=>{
            this.fanMap = res.data.fanlist
            this.totalfan = res.data.fanlist.length
            })
        },
        handledelfan(target){
            InfoApi.delFan(target).then(res=>{
            if(res.code == 20000){
                
            this.$message({
            type: 'success',
            message: '提交完成'
          });
          this.fetchdata(this.name)
                }
            else{
            this.$message({
            type: 'info',
            message: '删除成功'
          });    
                }
            })
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
    .totalfan{
        font-size: small;
        margin-left: 50px;
    }
</style>