<template>
    <div class="article-list">
        <div class="article-list-item" v-for="(item,index) in articleMap" :key="index">
            <div class="list-item-title">
                <span class="article-list-item-tag">{{item.typeOptions}}</span>
                <p class="article-list-item-txt ">
                    <a href="/postedit/102671012" target="_blank" title="编辑">{{item.title}}</a>
                </p>
            </div>

            <div class="article-list-item-info">
                <div class="item-info-left">
                    <span >{{item.style}}</span>
                    <span >{{item.date}}</span>
                    <span><li class="el-icon-view" ></li>{{item.views}}</span>
                    <span><li class="el-icon-tickets"></li>{{item.comments}}</span>
                </div>
                 <div class="item-info-oper">
                   <router-link  :to="{path:'/login'}" ><span class="check">查看</span></router-link>
                   <router-link  :to="{path:'/login'}" ><span class="del">删除</span></router-link>
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
        ]
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
            ArticleApi.getArticleList("all").then(response => {

                this.articleMap = this.matchStyle(response.data.pillList)
                console.log(this.articleMap);
            })
        },
    },
    watch:{
        styleOptions(newValue,oldValue){
            ArticleApi.getArticleList(newValue).then(response => {

                this.articleMap = response.data.pillList
                console.log(this.articleMap);
            })
        }
    },
    methods:{
        //匹配分类专栏
        matchStyle(obj){
            var index
            for(index in obj){
                console.log(obj[index].typeOptions);
                switch(obj[index].typeOptions){
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
                switch(obj[index].style){
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