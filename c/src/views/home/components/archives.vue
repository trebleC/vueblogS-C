<template>
  <div id="contentforarchives">
    <div class="article_wrap">
      <div class="article_title article_detail_title">archives</div>
      
  <el-timeline >
    <el-timeline-item v-for="(archives, index) in archives"
      :key="index"
      :timestamp="archives.timestamp"
      placement="top">
      <el-card>
        <router-link :to="{name:'articleDetail' ,params:{id:archives.id}}"><h4>{{archives.title}}</h4></router-link>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
    </div>

</template>

<script>
import ArticleApi from '@/api/article'
  export default {
    name: 'articleDetail',
    data() {
      return {
        archives: [{
          id:1,
            title:"更新 Github 模板",
            timestamp:"2018/4/12",
        },
        {
          id:2,
          title:"前端",
          timestamp:"2018/4/13",
        }
        
        ]
      }
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