<template>
<div class="top">
  <el-form ref="searchMap" :inline="true">
      <el-form-item label="搜索关键词">
        <el-input v-model="searchMap.name" placeholder="关键词"></el-input>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="searchMap.date"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        </el-form-item>
      <el-button type="primary" @click="fetchdata">查询</el-button>
      <el-button type="info"  @click="dialogFormVisible = true">添加</el-button>
      
  </el-form>
 <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
        <el-form :model="addMap">
          <el-form-item label="id" :label-width="formLabelWidth">
            <el-input v-model="addMap.id"></el-input>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="addMap.date"
              type="daterange"
              align="center"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="adddata">确 定</el-button>
  </div>

  </el-dialog>

  <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="账号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="summary"
      label="简介"
      width="180">
    </el-table-column> 
    <el-table-column
      prop="detail"
      label="详情"
      width="180">
    </el-table-column>
    <el-table-column
      prop="starttime"
      label="时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="邮件"
      width="180">
    </el-table-column>   
    
    <el-table-column
      prop="city"
      label="地址">
    </el-table-column>
  </el-table>
  <!-- 分页栏 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import GetheringApi from "@/api/gathering1"
export default {
    data(){
        return{
            list:null, // 活动数据
            total:400, //总数记录
            currentPage:1,
            size:10,
            searchMap:{},
            
            pickerOptions: {
              shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
              }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
              }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
              }]
            },

            addMap:{},//添加信息
            dialogFormVisible: false,
            formLabelWidth: '50px',
        }
    },
    created(){
        this.fetchdata();
    },
    methods: {
        fetchdata(){
            GetheringApi.search(this.currentPage,this.size,this.searchMap).then(response=>{
                this.list=response.data.rows
                this.total=response.data.total

            })
        
        },
        
        handleSizeChange(val) {
        this.size = val
        this.fetchdata()
        },
        handleCurrentChange(val) {
          this.size = val
          this.fetchdata()
         
        },
        adddata(){
          GetheringApi.add(this.addMap).then(response=>{
                  if(response.code==20000&&response.flag){
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                  }
                  else{
                    this.$message({
                      message: '未知错误！ 请重新添加',
                      type: 'error'
                    });
                  }
            })

        }


        

    }
}
</script>
<style>
.top{
  margin-top: 10px
}
</style>