<template>
  <div id="content">
    <div class="article_wrap">
      <div class="article_title article_detail_title">Categories</div>
      <div class="article_info">
        <span class="article_info_date">目前共计 {{ categories.length }} 个分类</span>
      </div>
      <div class="tag_detail" >
        <ul class="category" v-if="!categoryid" >
        <router-link  v-for="(item,key) in categories" :key=key :to="`categories/?category=${item.pill}`">
        
        <li class="categories">
        <span>{{item.pill}} </span><span class="tagcount">({{categories.length}})</span>
        </li>
        </router-link>
        </ul>

        <div v-else>
          <el-tag type="success" class="tagsfontsize">
        <span>{{categoryid}}</span>
        </el-tag><br>
          <contentList :contentList="contentMap"></contentList>
          </div>

        </div>
    </div>
  </div>
</template>

<script>
import CateApi from '@/api/home'

import contentList from '@/views/home/components/contentList'

  export default {
    name: 'cate',
    components:{
      contentList
    },
    data() {
      return {
        categoryid:this.$route.query.category,
        categories: {},
        contentMap:{}
      }
    },
    watch: {
      $route(){
         this.categoryid = this.$route.query.category
         //请求单一标签数据
         CateApi.getCategory(this.categoryid).then(response => {
                console.log(response.data)
                this.contentMap = response.data.article
                
            })

      },
      
},
    mounted: function () {
      CateApi.getCategoryList().then(response => {
                console.log(response.data)
                this.categories = response.data.category
                console.log(this.categories[0].pill);
                
            })
            this.categoryid = this.$route.query.category
         //请求单一标签数据
         CateApi.getCategory(this.categoryid).then(response => {
                console.log("ssdsadsad",response.data)
                this.contentMap = response.data.article
                
            })
    },
    // mounted: function () {
    //   ArticleApi.getSingleArticle(this.$route.params.id).then(response => {
    //             console.log(response.data)
    //             this.article = response.data
                
    //         })
    // },
    // methods: {
    //   compiledMarkdown: function () {
    //    // return marked(this.article.content || '', {sanitize: true})
    //    return this.article.content
    //   }
    // }
  }
</script>

<style>
.router-link-active{
  display: inline;
}
  .category>li{
    display: inline-block;
    margin-right: 5px;
  }
  .categories{
    display: inline-block;
    padding: 0 6px;
    color: #017e66;
    background-color: rgba(1,126,102,0.08);
    height: 25px;
    line-height: 25px;
    font-weight: normal;
    font-size: 20px;
    text-align: center;
  }
  .categories:hover{
     font-size: 30px
  }
  .tagcount{
    font-style: italic;
    font-size: 18px
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

  .tag_detail {
    text-align: left;
    padding: 60px 30px;
    font-size: 20px;
  }
</style>