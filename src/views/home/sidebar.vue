<template>
  <div id="left_menu">
    <div class="menu_name">
      <h1>TrebleC's Blog</h1>
      <h5>妳可能未必不喜歡我</h5>
    </div>
    <nav>
      <ul>
        <router-link to="/home">
          <li class="nav">
            <span>首页</span>
          </li>
        </router-link>
        <router-link to="/categories">
          <li class="nav">
            <span>分类</span>
          </li>
        </router-link>
        <router-link to="/archives">
          <li class="nav">
            <span>归档</span>
          </li>
        </router-link>
        <router-link to="/tags">
          <li class="nav">
            <span>标签</span>
          </li>
        </router-link>
        <router-link to="/search">
          <li class="nav">
            <span>搜索</span>
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="info">
      <img src="../../assets/head.jpg" alt="head">
      <div class="info_name">TrebleC</div>
      <div class="archive">
        <ul>
          <router-link to="/article">
            <li>
              <span class="archive_count">11{{ articleNumber }}</span>
              <span class="archive_name">日志</span>
            </li>
          </router-link>
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
          <a href="https://github.com/trebleC">
            <span>GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://weibo.com/p/1006053591355593" target="_blank">
            <span>Weibo</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <span>Bilibili</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <span>INS</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
        articleNumber: ''
      }
    },
    // mounted: function () {
    //   this.$http.get('/api/articleList').then(
    //     response => this.articleNumber = response.body.length,
    //     response => console.log(response)
    //   )
    // }
  }
</script>

<style>
  #left_menu {
    float: left;
    width: 240px;
    margin-right: 20px;
  }

  @media (max-width: 200px) {
    #left_menu {
      /*767px*/
      display: none;
    }
  }

  #left_menu a:hover {
    color: #222;
    background: #f5f7f9;
  }

  .menu_name {
    background: rgb(38, 42, 48);
    color: white;
    padding: 10px 0;
  }

  nav {
    background: white;
    padding: 20px 0;
  }

  .nav {
    padding: 8px 20px;
    text-align: left;
  }

  .info {
    margin-top: 10px;
    padding: 20px;
    background: white;
  }

  .info_name {
    font-weight: 600;
    padding: 5px;
  }

  .info img {
    width: 120px;
    height: 120px;
  }

  .archive {
    padding-top: 20px;
  }

  .archive .archive_count {
    display: block;
    color: #222;
    font-weight: 600;
    font-size: 16px;
  }

  .archive .archive_name {
    display: block;
    color: #999;
    font-size: 14px;
  }

  .communication {
    padding-top: 20px;
  }

  .communication_item {
    display: inline-block;
    width: 40%;
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
</style>