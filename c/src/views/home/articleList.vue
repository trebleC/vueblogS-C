<template>
  <div id="content">
    <div class="article_wrap" v-for="item in currentList">
      <div class="article_title" @click="articleDetail( item.detail )">{{ item.title }}</div>
      <!-- <div class="article_title">{{ item.title }}</div> -->
      <div class="article_info">
        <span class="article_info_date">发表于{{ item.date }} | </span>
        <span class="article_info_date">分类于 
           <el-link type="info" @click="pushCategories(item.classify)">
          {{ item.classify }} 
           </el-link>
          
          | </span>
        <span class="article_info_label" v-if="item.tag.length !==0">标签
        <el-tag  class="tag_margin" type="primary" v-for="tag in item.tag" @click="pushTag(tag)">{{ tag }}</el-tag>
        </span>
        <span class="article_info_date"> | 阅读数{{item.views}}</span>
      </div>
      <div class="article_gist">{{ item.title }}</div>
      <!-- <div @click="articleDetail( item._id )" class="article_button article_all">阅读全文 ></div> -->
      <div @click="articleDetail( item.detail )" class="article_button article_all">阅读全文 ></div>
      <div class="article_underline"></div>
    </div>
    <div class="pagination">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      background
      layout="prev, pager, next"
      :page-size="5" 
      :total="totalpages">
    </el-pagination>
    </div>
        <div class="copyright">
        
        ©  2018 - 
        <span itemprop="copyrightYear">2019</span>
        <span class="with-love">
          <i class="fa fa-heart"></i>
        </span>
        <span class="author" itemprop="copyrightHolder">TrebleC</span>
      </div>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'
  export default {
    name: 'article',
    data() {
      return {
        totalpages:0,
        currentPage:1,
        currentList:[],
        articleList: []
      }
    },
    mounted: function () {
      ArticleApi.getList().then(response => {
                this.totalpages = response.pillList.length
                //this.articleConditionMap = response.data.conditonOpts
                this.articleList = response.pillList
                this.currentList = response.pillList.slice(0,5)
                            })
    },
    methods: {
      articleDetail: function (id) {
        // 这边不能多一个斜杠 '/articleDetail/'  因为router定义的路由是 '/articleDetail:id'
        // 我把router改成 '/articleDetail/:id' 让前后端的路由规则一致
        console.log('/articleDetail/' + id);
        this.$router.push('/articleDetail/' + id)
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.currentList = this.articleList.slice((parseInt(val)-1)*5,parseInt(val)*5)
         document.documentElement.scrollTop = document.body.scrollTop = 0;


      },
      pushTag(tag){
        this.$router.push(`/tags?tag=${tag}`)

    },
    pushCategories(categories){
        this.$router.push(`/categories?category=${categories}`)

    }

    }
  }
</script>

<style>

  .article_wrap {
    padding: 40px;
  }

  .article_title {
    display: inline-block;
    color: #222;
    font-size: 34px;
    font-weight: 600;
    border-bottom: 1px solid white;
    cursor: pointer;
  }

  .article_title:hover {
    border-bottom: 1px solid #222;
  }

  .article_info {
    color: #999;
    font-size: 14px;
    padding-top: 8px;
  }

  .tag_margin {
    margin: 3px;
  }

  .article_gist {
    text-align: left;
    padding-top: 40px;
    padding-bottom: 40px;
    font-size: 16px;
  }

  .article_button {
    display: inline-block;
    padding: 3px 12px;
    border: 2px solid #222;
    color: #222;
    font-size: 14px;
    cursor: pointer;
  }

  .article_all:hover {
    color: white;
    background: #000;
    font-weight: 600;
  }

  .article_underline {
    height: 1px;
    width: 40px;
    background: #545455;
    margin: 80px auto 0;
  }
  .pagination{
    padding: 50px 0 100px 0
  }
  .copyright{
    font-size: 14px;
    color: #999;
    padding: 0 0 50px 0
  }
</style>