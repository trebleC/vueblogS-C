<template>
    <div>
        <el-dialog title="发布文章" :visible.sync="vis" @close="closeDialog" :show-close="true" top="10vh" width="80vh">
        <el-form :model="mdDialogMap">
          <el-form-item label="文章标签：" >


            <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputTagsVisible"
            v-model="inputTagsValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputTagsConfirm"
            @blur="handleInputTagsConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showTagsInput">+ New Tag</el-button>

            <el-tooltip class="item" effect="dark" content="最多添加5个标签呦！" placement="bottom-start">
            <i class="el-icon-question icon-size"></i>
            </el-tooltip>

          </el-form-item>
          <el-form-item label="分类专栏：">
            <el-tag
            :key="tag"
            v-for="tag in dynamicStyleTags"
            closable
            :disable-transitions="false"
            @close="handleStyleClose(tag)">
            {{tag}}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputStyleVisible"
            v-model="inputStyleValue"
            ref="saveStyleInput"
            size="small"
            @keyup.enter.native="handleInputStyleConfirm"
            @blur="handleInputStyleConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showStyleInput">+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="文章类型：">
              <el-select v-model="Selectvalue"  placeholder="请选择">
                <el-option
                  v-for="item in styleSelectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              
          </el-form-item>
          <el-input v-if="this.Selectvalue == 2 " class="showinput" v-model="mdDialogMap.url" placeholder="请输入转载地址" suffix-icon="el-icon-warning"></el-input>
              <el-input v-if="this.Selectvalue == 3 "  class="showinput" v-model="mdDialogMap.url" placeholder="请输入原文地址" suffix-icon="el-icon-warning"></el-input>
          <el-form-item label="发布类型">
            
            <el-radio v-model="radio" label="1">公开</el-radio>
            <el-radio v-model="radio" label="2">私密</el-radio>
            <el-radio v-model="radio" label="3">粉丝可见</el-radio>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="save">保存为草稿</el-button>

          <el-button @click="closeDialog">取 消</el-button>
          
          <el-button type="primary" @click="release" >确 定</el-button>
        </div>

  </el-dialog>

        
    </div>
</template>

<script>
import EditorAPi from "@/api/editor";
  export default {
    name: 'MdDialog',
    data() {
      return {

        mdDialogMap:{
          url:''
        },
        vis:false,
        formLabelWidth :'1px',
        
        dynamicTags: [],
        inputTagsVisible: false,
        inputTagsValue: '',

        dynamicStyleTags:[],
        inputStyleVisible: false,
        inputStyleValue: '',

        selectResult : 0,

        styleSelectOptions:[{label:'原创',value:'1'},{label:'转载',value:'2'},{label:'翻译',value:'3'}], //文章类型
        Selectvalue:'',

        radio:'1',//发布类型
        
      };
    },

    props: {
      visible:Boolean,
      article: Object,
      titlecount:Number,
    },


    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      handleStyleClose(tag){
        this.dynamicStyleTags.splice(this.dynamicStyleTags.indexOf(tag), 1);
      },

      showTagsInput() {
        this.inputTagsVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
       showStyleInput() {
        this.inputStyleVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveStyleInput.$refs.input.focus();
        });
      },
      handleInputTagsConfirm() {
        let inputTagsValue = this.inputTagsValue;
        if (inputTagsValue) {
          this.dynamicTags.push(inputTagsValue);
        }
        this.inputTagsVisible = false;
        this.inputTagsValue = '';
      },
      handleInputStyleConfirm() {
        let inputStyleValue = this.inputStyleValue;
        if (inputStyleValue) {
          this.dynamicStyleTags.push(inputStyleValue);
        }
        this.inputStyleVisible = false;
        this.inputStyleValue = '';
      },
      closeDialog () {
      this.$emit('close-dialogStatus', true)
      },

      // 保存为草稿
      save(){
      console.log(this.article)
      let date = this.getDate()
      let markdownMap = {
        editor:this.article.state, //md //rich
        state:0, //0草稿 //1已发布
        date:date,
        title:this.article.title,
        content:this.article.content,
        tags:this.dynamicTags,
        style:this.dynamicStyleTags,
        articleType:{type:this.selectResult,url:this.mdDialogMap.url},
        releaseType:this.radio
      }
      EditorAPi.savedraft(markdownMap).then(response=>{
                if(response.code==20000&&response.flag){
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                    this.$emit('close-dialogStatus', true)
                  }
                  else{
                    this.$message({
                      message: '未知错误！',
                      type: 'error'
                    });
                  }

            })
      
   

    },
    release(){
      console.log(this.titlecount)
      if(this.titlecount == 0 || this.titlecount >100){
        this.$message({
              message: '你的文章标题有问题哦，请检查一下！',
              type: 'error'
            });

      }else{
        let date = this.getDate()
        let markdownMap = {
          editor:this.article.state, //md //rich
          state:1, //0草稿 //1已发布
          date:date,
          title:this.article.title,
          content:this.article.content,
          tags:this.dynamicTags,
          style:this.dynamicStyleTags,
          articleType:{type:this.selectResult,url:this.mdDialogMap.url},
          releaseType:this.radio
      }
      EditorAPi.release(markdownMap).then(response=>{
                if(response.code==20000&&response.flag){
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                    this.$emit('close-dialogStatus', true)
                  }
                  else{
                    this.$message({
                      message: '未知错误！',
                      type: 'error'
                    });
                  }

            })
      }
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

    watch:{
      //监听visible状态
      visible(newValue,oldValue){
        this.vis = newValue

        

    }

  }
  }
</script>


<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .icon-size {
    font-size: 19px
  }
  .showinput{
    width: 300px;
    margin-left: 80px
  }
</style>