<template>

  <div id="tagfortagList">
    <br>
  <el-timeline>
    <el-timeline-item v-for="(item, index) in contentList"
      :key="index"
      :timestamp="item.date"
      placement="top">
      <el-card>
        <router-link :to="{name:'articleDetail' ,params:{id:item.id}}"><h4>{{item.title}}</h4></router-link>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>

</template>

<script>
import TagApi from '@/api/home'
  export default {
    name: 'tagcontentlist',
    props:{
        contentList:{
            type: Array,
            required: true
        }
    },
    data() {
      return {
          a:0
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

 .tagfortagList{
   margin-top: 20px
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