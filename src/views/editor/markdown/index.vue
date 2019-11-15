<template>
<div>
  <div style="  margin-left: 10px">
        <br>
    <el-form ref="markdownMap" :inline="true">
      <el-form-item  label="文章标题" >
           <el-tooltip class="item" effect="dark"   :disabled="disabled" content="标题最多只能 100 字哦！" placement="bottom-end">
        <el-input v-model="markdownMap.title"  placeholder="输入文章标题" size="90px">
          
          <template  slot="append">
            
          <span :class="countstyle">{{ fontcounts }}</span> 
          
          
          /100
          
          </template>
         
          </el-input>
          </el-tooltip>
      </el-form-item>
      <el-button type="info"  @click="savedraft">保存草稿</el-button>
      <el-button type="primary" @click="release">发布文章</el-button>
  </el-form>
  </div>
  <div>

    <mavon-editor  ref="editor"
     @save="savedraft"      
     @imgAdd="handleEditorImgAdd"
     style="  margin-top: 0px" v-model="markdownMap.content"/>
  </div>

  <MdDialog 
    :visible="visible" 
    @close-dialogStatus="Close_dialog" 
    :article="markdownMap" 
    :titlecount="fontcounts"
  ></MdDialog>
</div>
</template>

<script>


import EditorAPi from "@/api/editor";
import  { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';   

import uploadApi from '@/api/editor'
import ArticleApi from '@/api/article'

import  MdDialog  from "@/views/editor/components/MdDialog"

export default {
  name:"markdown",
  components: { 
    mavonEditor,
    MdDialog
    },
  data() {
    return {
      fontcounts:0,
      countstyle:"normal-font",
      disabled:true,
      detail:this.$route.query.detail,
      visible:false,
      formLabelWidth :'80px',
      markdownMap:{
        title:'',
        state:'md',
        date:this.getDate(),
        /*
        content: 
          `Markdown 语法简介
          =============
          > [语法详解](http://commonmark.org/help/)
          ## **粗体**
          \`\`\`
          **粗体**
          __粗体__
          \`\`\`
          ## *斜体*
          \`\`\`
          *斜体*
          _斜体_
          \`\`\`
          ## 标题
          \`\`\`
          # 一级标题 #
          一级标题
          ====
          ## 二级标题 ##
          二级标题
          ----
          ### 三级标题 ###
          #### 四级标题 ####
          ##### 五级标题 #####
          ###### 六级标题 ######
          \`\`\`
          ## 分割线
          \`\`\`
          ***
          ---
          \`\`\`
          ****
          ## ^上^角~下~标
          \`\`\`
          上角标 x^2^
          下角标 H~2~0
          \`\`\`
          ## ++下划线++ ~~中划线~~
          \`\`\`
          ++下划线++
          ~~中划线~~
          \`\`\`
          ## ==标记==
          \`\`\`
          ==标记==
          \`\`\`
          ## 段落引用
          \`\`\`
          > 一级
          >> 二级
          >>> 三级
          ...
          \`\`\`
          ## 列表
          \`\`\`
          有序列表
          1.
          2.
          3.
          ...
          无序列表
          -
          -
          ...
          \`\`\`
          ## 链接
          \`\`\`
          [链接](www.baidu.com)
          ![图片描述](http://www.image.com)
          \`\`\`
          ## 代码段落
          \`\`\` type
          代码段落
          \`\`\`
          \` 代码块 \`
          \`\`\`c++
          int main()
          {
              printf("hello world!");
          }
          \`\`\`
          \`code\`
          ## 表格(table)
          \`\`\`
          | 标题1 | 标题2 | 标题3 |
          | :--  | :--: | ----: |
          | 左对齐 | 居中 | 右对齐 |
          | ---------------------- | ------------- | ----------------- |
          \`\`\`
          | 标题1 | 标题2 | 标题3 |
          | :--  | :--: | ----: |
          | 左对齐 | 居中 | 右对齐 |
          | ---------------------- | ------------- | ----------------- |
          ## 脚注(footnote)
          \`\`\`
          hello[^hello]
          \`\`\`
          见底部脚注[^hello]
          [^hello]: 一个注脚
          ## 表情(emoji)
          [参考网站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
          \`\`\`
          :laughing:
          :blush:
          :smiley:
          :)
          ...
          \`\`\`
          :laughing::blush::smiley::)
          ## $\KaTeX$公式
          我们可以渲染公式例如：$x_i + y_i = z_i$和$\sum_{i=1}^n a_i=0$
          我们也可以单行渲染
          $$\sum_{i=1}^n a_i=0$$
          具体可参照[katex文档](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函数](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文档](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)
          ## 布局
          ::: hljs-left
          \`::: hljs-left\`
          \`居左\`
          \`:::\`
          :::
          ::: hljs-center
          \`::: hljs-center\`
          \`居中\`
          \`:::\`
          :::
          ::: hljs-right
          \`::: hljs-right\`
          \`居右\`
          \`:::\`
          :::
          ## 定义
          术语一
          :   定义一
          包含有*行内标记*的术语二
          :   定义二
                  {一些定义二的文字或代码}
              定义二的第三段
          \`\`\`
          术语一
          :   定义一
          包含有*行内标记*的术语二
          :   定义二
                  {一些定义二的文字或代码}
              定义二的第三段
          \`\`\`
          ## abbr
          *[HTML]: Hyper Text Markup Language
          *[W3C]:  World Wide Web Consortium
          HTML 规范由 W3C 维护
          \`\`\`
          *[HTML]: Hyper Text Markup Language
          *[W3C]:  World Wide Web Consortium
          HTML 规范由 W3C 维护
          \`\`\`
          `
        ,*/
        html:'',
        content:'123',
      },
      
    }
  },
 watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
    markdownMap:{
        handler:function(){
            this.count()
        },
         deep:true
        },
    $route(){
         this.detail = this.$route.query.detail
         console.log(this.detail);
         //请求单一文章数据
         ArticleApi.getSingleArticle(this.detail).then(response => {
                console.log(response.data)
                this.markdownMap = response.data
                
            })

      },
  },
mounted(){
  this.detail = this.$route.query.detail
         console.log(this.detail);
         //请求单一文章数据
         ArticleApi.getSingleArticle(this.detail).then(response => {
                console.log(response.data)
                this.markdownMap = response.data
                
            })

},


methods:{

    Close_dialog(){
      this.visible = false
    },
    //计算标题字数
    count(){
      this.fontcounts = this.markdownMap.title.length
      if(this.fontcounts > 100){

              this.countstyle = 'more-font'
              this.disabled = false
      }
      else{
        this.countstyle = 'normal-font'
        this.disabled = true
      }

    },
    savedraft(){

      console.log(this.markdownMap)
      if(this.fontcounts<=100){
      EditorAPi.savedraft(this.markdownMap).then(response=>{
                if(response.code==20000&&response.flag){
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                  }
                  else{
                    this.$message({
                      message: '未知错误！',
                      type: 'error'
                    });
                  }

            })
      }
      else{
        this.$message({
              message: '标题字数超出限制！！',
              type: 'error',
              center:true
            });
      }

    },
    release(){
        this.visible = true
              this.markdownMap.html = this.$refs.editor.d_render;

    },
    getDate() {//获取当前时间
      if(this.detail) return this.detail
      else{
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + date.getHours()  + seperator2  + date.getMinutes()
          + seperator2 + date.getSeconds();
      return currentdate;
      }
    },  
    handleEditorImgAdd (pos, $file) {
      console.log(pos);
            let formdata = new FormData()
            formdata.append('file', $file)
            //this.imgFile[pos] = $file
            uploadApi.uploadPic(formdata).then(res => {
                if (res.code === 20000) {
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    });

                } else {
                  this.$message({
                      message: res.data.msg,
                      type: 'error'
                    });
                }
            })
        },


  }
}
</script>

<style>
.editor-content{
}
  .normal-font{
    color: #909399;
  }
  .more-font{
    color: #f56c6c;
    font-size: 18px;
  }
  .intro-head{
    text-align: center;
    margin: 10px;
  }
.v-note-wrapper{
  z-index:1 !important;
}
</style>


