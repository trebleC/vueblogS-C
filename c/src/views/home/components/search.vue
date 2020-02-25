<template>
    <div class="searchcontain">
        <el-autocomplete
            class="search"
            v-model="state"
            size:medium 
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            @change="submitMsg"
            >
            
  </el-autocomplete>
  <el-button @click="submitMsg" class="success">search</el-button>
  <div v-if="searchshow">
      <contentList :contentList="contentMap"></contentList>
  </div>
    </div>
        
</template>

<script>
import SearchApi from '@/api/home'
import contentList from '@/views/home/components/contentList'
export default {
    name: "search",
    components:{
        contentList
    },
    data() {
      return {
        restaurants: [],
        state: '',
        timeout:  null,
        searchshow:false,
        contentMap:[]
      };
    },
    methods: {
      loadAll() {
        return [
          { "value": "toString的用法", "category": "js" },
          { "value": "路由守卫填坑", "category": "vue" },
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.submitMsg(item[0]);
      },
      submitMsg(msg){
        SearchApi.searchMsg(msg).then(response=>{
            if(response.flag){
                this.searchshow = true
                this.contentMap = response.data.article
                console.log(this.contentMap);
            }
        })
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }

    
}
</script>

<style>

 .search{
     padding: 100px 0 0 0 ;
     width: 500px
 }
 .searchcontain{
         /* cursor: default;*/
    margin: 40px 0 0; 
    display: inline-block;
    color: #222;
    font-size: 34px;
    font-weight: 600;
    border-bottom: 1px solid white;
    cursor: pointer;
  }
 
   .article_detail_title {
    /* cursor: default;*/
    margin: 40px 0 0; 
    display: inline-block;
    color: #222;
    font-size: 34px;
    font-weight: 600;
    border-bottom: 1px solid white;
    cursor: pointer;
  }
</style>