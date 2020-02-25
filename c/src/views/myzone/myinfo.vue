<template>
    <div style="width:900px">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="头像">
            <el-avatar large="100" :src="form.avatar"></el-avatar>
            <el-button type="" round @click="changeava"><span style="color:#f78a47;font-size:13px;font-weight:bold;">更换头像</span></el-button>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="学历">
            <el-input v-model="form.education"></el-input>
        </el-form-item>
        <el-form-item label="简介">
            <el-input type="textarea" v-model="form.introduction" placeholder="毕业于清华大学，拥有超过13年的工作经验。 Oracle认证 讲师，拥有6年以上授课经验。精通Oracle数据库、中间 （Weblogic）和大数据Hadoop的管理和开发。 曾为湖北 移动，中国移动，山东教育网进行培训。著有畅销书《IT 必学课》，曾获得xx奖项。"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
     data() {
      return {
        form: {
          avatar:'./dist/static/img/head.53d48db.jpg',
          name: '',
          gender:'',
          birthday: '',
          education: '',
          introduction: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      changeava(){
          console.log('success!');
      }
    }
}
</script>
<style>
.c{
   color: #f78a47
}
</style>