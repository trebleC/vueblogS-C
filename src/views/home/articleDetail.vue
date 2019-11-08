<template>
  <div id="content">
    <div class="article_wrap">
      <div class="article_title article_detail_title">{{ article.title }}</div>
      <div class="article_info">
        <span class="article_info_date">发表于：{{ article.date }}</span>
        <span class="article_info_label">标签：
        <span v-if="0">未分类</span>
        <el-tag v-else class="tag_margin" type="primary">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_detail_content" v-html="compiledMarkdown()"></div>
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
        article: {}
        ,tag:'转载'
      }
    },
    mounted: function () {
      ArticleApi.getSingleArticle(this.$route.params.id).then(response => {
                console.log(response.data)
                this.article = response.data
                
            })
    },
    methods: {
      compiledMarkdown: function () {
       // return marked(this.article.content || '', {sanitize: true})
       return this.article.content
      }
    }
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