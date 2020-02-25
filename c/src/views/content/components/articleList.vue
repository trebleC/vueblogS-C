<template>
    <div class="article-list" v-loading="listLoading" element-loading-text="Loading">
        <div class="article-list-item" v-for="(item,index) in articleMap" :key="index">
            <div class="list-item-title">
                <span class="article-list-item-tag">{{item.typeOptions}}</span>
                <p class="article-list-item-txt ">
                    <a :href="'/#/editor/Markdown?detail='+item.detail"  title="编辑">{{item.title}}</a>
                </p>
            </div>

            <div class="article-list-item-info">
                <div class="item-info-left">
                    <span >{{item.style}}</span>
                    <span >{{item.date}}</span>
                    <span><li class="el-icon-view" ></li>{{item.views}}</span>
                    <span><li class="el-icon-s-comment"></li>{{item.comments}}</span>
                </div>
                 <div class="item-info-oper">
                   <router-link  :to="{path:`/articleDetail/${item.detail}`}" ><span class="check">查看</span></router-link>
                   <router-link  :to="{path:`/editor/Markdown?detail=${item.detail}`}" ><span class="check">编辑</span></router-link>
                   <el-button type="text" href="javascript:;"  @click="del(item.detail)" title="删除">删除</el-button>
                 </div>
                </div>

        </div>
    </div>
</template>


<script>
import ArticleApi from '@/api/article'
export default {
    
    name:'articleList',
    data(){
        return{
        articleMap:[
        // title: '',
        // date:'',
        // isdraft: '',
        // style:'',
        // typeOptions: '',
        // views: '',
        // comments:'',
        // detail: ''
        ],
        listLoading:true
        }
    },
    props:{
        styleOptions:String
    }
    ,
    created(){
        this.fetchdata
    },
    computed:{
        fetchdata(){
            this.listLoading=true
            ArticleApi.getArticleList("all").then(response => {
                this.listLoading=false
                this.articleMap = this.matchStyle(response.data.pillList) 
                this.articleMap = response.data.pillList
                console.log(this.articleMap);
            })
        },
    },
    watch:{
        styleOptions(newValue,oldValue){
            ArticleApi.getArticleList(newValue).then(response => {

                this.articleMap = this.matchStyle(response.data.pillList) 
                console.log(this.articleMap);
            })
        },

    },
    methods:{
        //匹配分类专栏
        matchStyle(obj){
            var index
            for(index in obj){
                let a = obj[index].typeOptions
                console.log('aaaa',obj[index].typeOptions,);
                switch(parseInt(obj[index].typeOptions)){
                    case 1:
                       obj[index].typeOptions = '公开'
                        break;    
                    case 2:
                        obj[index].typeOptions = '私密'
                        break;
                    case 3:
                        obj[index].typeOptions = '粉丝可见'
                        break;
                    case 4:
                        obj[index].typeOptions = '草稿'
                        break;
                    case 5:
                        obj[index].typeOptions = '回收站'  
                        break;
                    default:
                        obj[index].typeOptions = '稿件' 
                        break;
                }
                switch(parseInt(obj[index].style)){
                    case 1:
                       obj[index].style = '原创'
                        break;    
                    case 2:
                        obj[index].style = '转载'
                        break;
                    case 3:
                        obj[index].style = '翻译'
                        break;
                    default:
                        obj[index].style = '未定义' 
                        break;
                }
            }
            return obj
        },
        del(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            ArticleApi.delArticle(id).then(res=>{
                if(res.code){
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                ArticleApi.getArticleList("all").then(response => {

                this.articleMap = this.matchStyle(response.data.pillList) 
            })

                }
                else{
                    this.$message({
                      message: '删除失败，请重试',
                      type: 'error'
                    });
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });

            
            // ArticleApi.delArticle(id).then(res=>{
            //     if(res.code){
            //         this.$message({
            //           message: '删除成功',
            //           type: 'success'
            //         });
            //     ArticleApi.getArticleList("all").then(response => {

            //     this.articleMap = response.data.pillList
            // })

            //     }
            //     else{
            //         this.$message({
            //           message: '删除失败，请重试',
            //           type: 'error'
            //         });
            //     }
            // })
        }
    }

}
</script>

<style>
.article-list{
    margin-left: 30px;
    margin-right: 30px;
    padding: 8px 0 16px 0;
}
.article-list-item{
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    border-bottom: 1px dotted #ddd;
    padding: 1rem 0 1rem 0;
    color: #999;
    font-size: 12px;
}
.list-item-title{
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-pack: start;
    justify-content: flex-start;
}


.article-list-item-info{
    margin-top: 0.5rem;
    margin-right: 100px;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: center;
    align-items: center;
}
.article-list-item-tag{
    font-size: 12px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    margin-right: 0.5rem;
    white-space: nowrap;
    border: 1px solid #e9e9e9;
}
.article-list-item-txt  {
    margin-top: 0;
    font-size: 18px;
    color: #4d4d4d;
    margin-bottom: 0;
    
}
div.item-info-left > span {
    margin-right: 1.5rem;
}
.item-info-oper{
    margin-left: auto;
}
.check{
    color: #349EDF;
    padding: 0px .5rem;
    border-right: 1px solid #e9e9e9;
    cursor: pointer;
}
.del{
    padding: 0px .5rem;
    border-right: 0;
    color: #CA0C16;
}

</style>