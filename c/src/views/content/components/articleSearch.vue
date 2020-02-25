<template>
  <div style="  margin-left: 10px">
        <br>
    <el-form ref="articleMap" :inline="true">
      <el-form-item  label="筛选：">
            <el-select
            @change="se"
            v-model="Selectvalue[index]"
            :key="index" 
            v-for="(item,index) in articleConditionMap" 
            :placeholder="index" >
                <el-option
                v-for="(opt,index) in item"
                :key="index"
                :label="opt"
                :value="index">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  >
        <el-input v-model="articleConditionMap.keyword"  placeholder="输入关键字" size="10px"> </el-input>

        </el-form-item>
      <el-button type="primary" >搜索</el-button>
  </el-form>
  </div>

</template>

<script>
import ArticleApi from '@/api/article'
export default {
    name:"articleSearch",
    data(){
        return{
            articleConditionMap:{
                "year": ['不限'],
                "mon": ['不限'],
                "style": ['不限'],
                "classify": ['不限']
            },
            articleMap:{},
            Selectvalue:{
                year:'',
                mon:'',
                style:'',
                classify:''
            }
        }
    },
    created(){
        this.fetchdata
    },
    computed:{
        fetchdata(){
            ArticleApi.getList().then(response => {
                //console.log(response.data.conditonOpts)
                
                //this.articleConditionMap = response.data.conditonOpts
                this.articleMap = response.data.pillList
                
                this.articleConditionMap = this.insert(response.data.conditonOpts,this.articleConditionMap)
                //console.log("11111")
                //console.log(this.articleConditionMap)
            })
        },
    }
    ,
    methods:{
        
        se(){
            console.log(this.Selectvalue)
        },
        //获取对象长度或索引
        getObjLength(obj){
            let arr = Object.keys(obj)
            return arr.length
        },
        getObjIndex(obj){
            let arr = Object.keys(obj)
            return arr
        },
        getObjValue(obj){
            let arr = Object.values(obj)
            return arr
        },
        //插值
        insert(obj,baseobj){
            var objlen = this.getObjLength(obj)
            var arrIndex = this.getObjIndex(obj)
            var arrValue = this.getObjValue(obj)
            var baseValue = this.getObjValue(baseobj)
            var newObj = {}
            for(let i = 0; i < objlen; i++){
               let arr = baseValue[i].concat(arrValue[i])
                // arrValue[i].concat(arr)
                // arr.concat(arrValue[i])
                var a = [1,2,3];
                newObj[arrIndex[i]]=arr
            }
            return newObj
        }

    }
}
</script>