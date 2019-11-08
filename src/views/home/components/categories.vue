<template>
  <div id="content">
    <div class="article_wrap">
      <div class="article_title article_detail_title">{{ article.title }}</div>
      <div class="article_info">
        <span class="article_info_date">目前共计 {{ tag }} 个分类</span>
      </div>
      <div class="article_detail_content" ><span class="article_info_date">前端 11 </span></div>
    </div>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'
  //import marked from 'marked'
  //import highlight from 'highlight.js'
  //import '../assets/atom-one-light.css'
  // marked.setOptions({
  //   highlight: function (code) {
  //     return highlight.highlightAuto(code).value
  //   }
  // })
  export default {
    name: 'articleDetail',
    data() {
      return {
        article: {
            title:"Categories"
        }
        ,tag:'1'
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

  .article_detail_content {
    text-align: left;
    padding: 60px 0;
    font-size: 18px;
  }
</style>