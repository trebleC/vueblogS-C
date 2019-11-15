<template>
  <div id="content">
    <div class="article_wrap">
      <div class="article_title article_detail_title">Tags</div>
      <div class="article_info">
        <span class="article_info_date">目前共计 {{ tagList.length }} 个分类</span>
      </div>
      <div class="tag_detail" >
        <ul class="taglist" v-if="!tagid">
        <li v-for="(item,key) in tagList" :key=key>
        <router-link :to="`tags/?tag=${item.pill}`" >
        <el-tag type="success" class="tagsfontsize">
        <span>{{item.pill}}({{item.article.length}}) </span>
        </el-tag>
        </router-link>
        </li>
        </ul>

        <div v-else>
          <el-tag type="success" class="tagsfontsize">
        <span>{{tagid}}</span>
        </el-tag><br>
          <contentList :contentList="contentMap"></contentList>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import TagApi from '@/api/home'

import contentList from '@/views/home/components/contentList'

  export default {
    name: 'articleDetail',
    components:{
      contentList
    },
    data() {
      return {
        tagid:this.$route.query.tag,
        tagList: {},
        contentMap:{}
      }
    },
    created(){
      
    },
    watch: {
      $route(){
         this.tagid = this.$route.query.tag
         //请求单一标签数据
         TagApi.getTag(this.tagid).then(response => {
                console.log("ssdsadsad",response.data)
                this.contentMap = response.data.article
                
            })

      },
      
},
    mounted: function () {
      this.tagid = this.$route.query.tag
      TagApi.getTagList().then(response => {
                console.log(response.data)
                this.tagList = response.data.tag
                
            })
            this.tagid = this.$route.query.tag
         //请求单一标签数据
         TagApi.getTag(this.tagid).then(response => {
                this.contentMap = response.data.article
                
            })
    },
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
  .taglist>li{
    display: inline-block;
    margin-right: 5px;
  }
  .tagsfontsize{
    font-size: 20px
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