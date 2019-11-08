<template>
    <div>
        <el-tabs v-model="activeName" :stretch='true' @tab-click="handleClick" class="tabs">
            <el-tab-pane 
            v-model="type_options"
            v-for="(item,index) in type_options"
            :key="index"
            :name="item.optName"
            :label="item.optLable"
            >
            <articleSearch></articleSearch>
            </el-tab-pane>
            <!-- <el-tab-pane label="全部" name="all">全部</el-tab-pane>
            <el-tab-pane label="公开" name="open">公开</el-tab-pane>
            <el-tab-pane label="私密" name="privacy">私密</el-tab-pane>
            <el-tab-pane label="粉丝" name="fans">粉丝</el-tab-pane>
            <el-tab-pane label="草稿箱" name="draft">草稿箱</el-tab-pane>
            <el-tab-pane label="回收站" name="recycle">回收站</el-tab-pane> -->
        </el-tabs>
        <articleList :styleOptions="activeName"></articleList>
    </div>
</template>

<script>
import ArticleApi from '@/api/article'
import articleSearch from '@/views/content/components/articleSearch'
import articleList from '@/views/content/components/articleList'
export default {
    components:{articleSearch,articleList},
    data(){
        return {
            menuMap:{},
            type_options:[
                {optLable:'全部',optName:'all'},
                {optLable:'公开',optName:'open'},
                {optLable:'私密',optName:'privacy'},
                {optLable:'粉丝',optName:'fans'},
                {optLable:'草稿箱',optName:'draft'},
                {optLable:'回收站',optName:'recycle'},

            ],
            activeName:'all',
        }
    },
    methods:{
        handleClick(tab, even){
            
            //console.log(tab, even)
            this.$router.push({ name: 'Postlist', params: { pro: this.activeName }})

        },
        fetchdata(){
            ArticleApi.getMenu().then(Response => {

                this.menuMap = Response.data.menu
                this.menuMap['all'] = 0 
                for(let item in this.menuMap){
                    if(item!="all"&&item!='recycle')
                    this.menuMap['all']+=this.menuMap[item]
                }
                
                for(let i = 0;i < this.type_options.length ;i++){
                    switch (Object.keys(this.menuMap)[i]) {
                        case "all":
                            this.type_options[0].optLable +='('+Object.values(this.menuMap)[i]+')'                           
                            break;
                        case "open":
                            this.type_options[1].optLable +='('+Object.values(this.menuMap)[i]+')'    
                            break;    
                        case "privacy":
                            this.type_options[2].optLable +='('+Object.values(this.menuMap)[i]+')'    
                            break;
                        case "fans":
                            this.type_options[3].optLable +='('+Object.values(this.menuMap)[i]+')'    
                            break;
                        case "draft":
                            this.type_options[4].optLable +='('+Object.values(this.menuMap)[i]+')'    
                            break;
                        case "recycle":
                            this.type_options[5].optLable +='('+Object.values(this.menuMap)[i]+')'    
                             break;
                        
                        default:
                            this.type_options[i].optLable = "all"
                            break;
                    }
                }
            })
        },
    },
    created(){
        console.log("ok")
        this.fetchdata()
        this.$router.push({ name: 'Postlist', params: { pro: this.activeName }})
      
    }
}
</script>
<style>
.tabs{
    margin-left: 20px;
}

</style>