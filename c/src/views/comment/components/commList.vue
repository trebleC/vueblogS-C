<template>
    <div>
        <div v-if="activeOpt=='articleComm'" >
            <div class="comshowdiv" v-for="(item,index) in articleCommMap" :key="index">
                <span class="circleImg"><img src="@/../dist/static/img/head.53d48db.jpg"  /></span>
                <span>{{item.toName}}</span>
                <span class="comtimestamp">{{item.timestamp}} 时间前 回复了你的文章 </span>
                <router-link :to="{path:`/articleDetail/${item.articleTitle}`}"><span style="color:#349edf">{{item.articleTitle}}</span></router-link>
                
                <el-button type="text" class="comfun"  @click="handlecomdel(item.toName)"><span class="checkr">删除</span></el-button>
                <el-button type="text"  class="comfun" @click="handlecomreply(item.toName)"><span class="checkl">快速回复</span></el-button>


                    <svg style="display: block;" xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="comicon"><path d="M14.75 26c0 2.05-1.65 3.7-3.7 3.7H3.7C1.65 29.7 0 28.05 0 26V12.45C0 7.05 4.4 2.6 9.85 2.6h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25H9.85c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26zM32 26c0 2.05-1.65 3.7-3.7 3.7h-7.4c-2.05 0-3.7-1.65-3.7-3.7V12.45c0-5.4 4.4-9.85 9.85-9.85h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25h-1.25c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26z"></path></svg>
                    <div class="commentctn">{{item.comment}}
                    <svg  xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="comicon"><path d="M14.9 19.6c0 5.4-4.4 9.85-9.85 9.85H3.8c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H3.8c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6zm17.2 0c0 5.4-4.4 9.85-9.85 9.85H21c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H21c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6z"></path></svg>
                </div>




                <el-divider></el-divider>
            </div>
        </div>

        <div v-else-if="activeOpt=='myComm'">
             <div class="comshowdiv" v-for="(item,index) in myCommMap" :key="index">
                <span class="circleImg"><img src="@/../dist/static/img/head.53d48db.jpg"  /></span>
                <span>我 </span>
                <span class="comtimestamp">{{item.timestamp}}时间前 评论了 <span style="color:#000">{{item.fromName}}</span> 的文章 </span>
                
                <router-link :to="{path:`/articleDetail/${item.articleTitle}`}"><span style="color:#349edf">{{item.articleTitle}}</span></router-link>
               <el-button type="text"  class="comfun"  @click="handlecomdel(item.toName)"><span class="checkr">删除</span></el-button>

                    <svg style="display: block;" xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="comicon"><path d="M14.75 26c0 2.05-1.65 3.7-3.7 3.7H3.7C1.65 29.7 0 28.05 0 26V12.45C0 7.05 4.4 2.6 9.85 2.6h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25H9.85c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26zM32 26c0 2.05-1.65 3.7-3.7 3.7h-7.4c-2.05 0-3.7-1.65-3.7-3.7V12.45c0-5.4 4.4-9.85 9.85-9.85h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25h-1.25c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26z"></path></svg>
                    <div class="commentctn">{{item.comment}}
                    <svg  xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="comicon"><path d="M14.9 19.6c0 5.4-4.4 9.85-9.85 9.85H3.8c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H3.8c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6zm17.2 0c0 5.4-4.4 9.85-9.85 9.85H21c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H21c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6z"></path></svg>
                </div>
                <el-divider></el-divider>
            </div>
        </div>
    </div>
</template>

<script>
import ArticleApi from '@/api/article'
export default {
    props:{
        activeOpt:String
    },
    data(){
        return{
            articleCommMap:[],
            myCommMap:[]

        }
    },
    created(){
        this.fetchdata
    },
    computed:{
        fetchdata(){
            ArticleApi.getComment("123").then(response => {
                this.articleCommMap = response.data.articleComment
                console.log(this.articleCommMap);
                this.myCommMap = response.data.myComment
            })
        },
    },
    methods:{
        handlecomreply(id){
        this.$prompt('发表你的评论', '快速回复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '超出字数'
        }).then(({ value }) => {
          ArticleApi.replyComment(id,{}).then(res => {
            if(res.code == 20000){
            this.$message({
            type: 'success',
            message: '提交完成'
          });
                }
            else{
            this.$message({
            type: 'info',
            message: '删除成功'
          });    
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      handlecomdel(id){
        this.$confirm('此操作将永久删除该评论, 是否继续?', '删除评论', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            ArticleApi.delComment(id).then(res => {
            if(res.code == 20000){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
                }
            else{
            this.$message({
            type: 'info',
            message: '删除成功'
          });    
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
        
    }
}
</script>
<style>
.comicon{
    height: 16px;
    fill: #d4d4d4;
}
.comtimestamp{
    color:#999;
}
.circleImg{
  margin: 20px 8px 20px 0 ;
  vertical-align: middle;
}
.circleImg img{
  border-radius: 30px;
  width:40px;
  height:40px;
}
.commentctn{
    width: 850px;
    margin-left: 40px;
    margin-top: -10px;
}

.comshowdiv{
    width: 900px;
}
.comfun{
     float: right;
}
.comshowdiv .comfun{
    display: none
}
.comshowdiv:hover .comfun{
    display: inline;
}

.checkl{
    color: #349edf;
    padding: 0px .5rem;
    border-right: 1px solid #e9e9e9;
    cursor: pointer;
}
.checkr{
    color: rgb(202, 12, 22);
    padding: 0px .5rem;
    border-right: 0px solid #e9e9e9;
    cursor: pointer;
}
</style>