<template>
    <div style="margin-left: 20px;">
        <el-tabs v-model="activeName">
            <el-tab-pane label="我的文章评论" name="articleComm"></el-tab-pane>
            <el-tab-pane label="我发表的评论" name="myComm"></el-tab-pane>
        </el-tabs>

        <commList :activeOpt="activeName"></commList>
    </div>
</template>
<script>
import commList from '@/views/comment/components/commList'
export default {
    components:{
        commList
    },
    data(){
        return{
            activeName:"articleComm",
        }
    },
}
</script>