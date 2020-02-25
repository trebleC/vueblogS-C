import request from '@/utils/request'
const api_name = 'api'
export default {
    /* 
    TAG 
    */
  getTagList(){
    return request({
      url:`/tagList`,
      method:'get'
    })
  },
  getTag(tag){
    return request({
      url:`/tag`,
      method:'get',
      data:tag
    })
  },
/* 
    category 
    
    */
   getCategoryList(){
    return request({
      url:`/categoryList`,
      method:'get'
    })
  },
  getCategory(category){
    return request({
      url:`/category`,
      method:'get',
      data:category
    })
  },
  /*
  Comments 
  */
 commitComment(msg){
  return request({
    url:`comment/commitComment`,
    method:'post',
    data:msg
  })
 },
 replycomment(msg){
  return request({
    url:`comment/replyComment`,
    method:'post',
    data:msg
  })
 },
 /*
 Search 
 */
searchMsg(msg){
  return request({
    url:`/search`,
    method:'post',
    data:msg
  })

}
}
