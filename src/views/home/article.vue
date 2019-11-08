<template>
  <div id="content">
    <div class="article_wrap" v-for="item in articleList">
      <div class="article_title" @click="articleDetail( item.detail )">{{ item.title }}</div>
      <!-- <div class="article_title">{{ item.title }}</div> -->
      <div class="article_info">
        <span class="article_info_date">发表于：{{ item.date }}</span>
        <span class="article_info_label">标签：
        <span v-if="0">未分类</span>
        <!-- <el-tag v-else class="tag_margin" type="primary" v-for="tag in item.labels">{{ tag }}</el-tag> -->
        <el-tag v-else class="tag_margin" type="primary" >{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{ item.title }}</div>
      <!-- <div @click="articleDetail( item._id )" class="article_button article_all">阅读全文 ></div> -->
      <div @click="articleDetail( item.detail )" class="article_button article_all">阅读全文 ></div>
      <div class="article_underline"></div>
    </div>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'
  export default {
    name: 'article',
    data() {
      return {
        articleList: []
        ,tag:"转载"
      }
    },
    mounted: function () {
      ArticleApi.getList().then(response => {
                console.log(response.pillList)

                //this.articleConditionMap = response.data.conditonOpts
                this.articleList = response.pillList
                
            })
    },
    methods: {
      articleDetail: function (id) {
        // 这边不能多一个斜杠 '/articleDetail/'  因为router定义的路由是 '/articleDetail:id'
        // 我把router改成 '/articleDetail/:id' 让前后端的路由规则一致
        console.log('/articleDetail/' + id);
        this.$router.push('/articleDetail/' + id)
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
</style>