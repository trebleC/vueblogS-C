<template>
<div>
  <div style="  margin-left: 10px">
        <br>
    <el-form ref="richtextMap" :inline="true">
      <el-form-item  label="文章标题">
           <el-tooltip class="item" effect="dark"   :disabled="disabled" content="标题最多只能 100 字哦！" placement="bottom-end">
        <el-input v-model="richtextMap.title"  placeholder="输入文章标题" size="90px">
          
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
  <div class='tinymce'>
    <editor id='tinymce' v-model='richtextMap.content' :init='init'></editor>
    <div v-html='richtextMap.content'></div>
  </div>
  <MdDialog :visible="visible" @close-dialogStatus="Close_dialog" :article="richtextMap" :titlecount="fontcounts"></MdDialog>
</div>
</template>

<script>
import EditorAPi from "@/api/editor"

import tinymce from 'tinymce/tinymce'

import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'


import  MdDialog  from "@/views/editor/components/MdDialog"

export default {
  name: 'tinymce',
  data () {
    return {
    fontcounts:0,
    countstyle:"normal-font",
    disabled:true,
    visible:false,
    richtextMap:{
        title:'',
        state:'rich',
        date:this.getDate(),
        content:'请输入内容'
    },
    init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false
      }
    }
  },
  watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
    richtextMap:{
        handler:function(){
            this.count()
        },
         deep:true
        }
    },
    methods:{
        //计算标题字数
    count(){
      this.fontcounts = this.richtextMap.title.length
        console.log(this.fontcounts)
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
      console.log(this.richtextMap)
      if(this.fontcounts<=100){
      EditorAPi.savedraft(this.richtextMap).then(response=>{
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
    },
     Close_dialog(){
      this.visible = false
    },
     getDate() {//获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + date.getHours()  + seperator2  + date.getMinutes()
          + seperator2 + date.getSeconds();
      return currentdate;
},
    },
  mounted () {
    tinymce.init({

    })
  },
  components: {Editor,MdDialog}
}
</script>

<style>
    .normal-font{
    color: #909399;
  }
  .more-font{
    color: #f56c6c;
    font-size: 18px;
  }
</style>