import request from '@/utils/request'
const group_name = 'article'
const api_name = 'article'
export default {
  getSingleArticle(id){
    return request({
      url:`/${group_name}/detail/${id}`,
      method:'get'
    })
  },
    getList(){
      return request({
        url:`/${group_name}`,
        method:'get'
      })
    },
    getMenu(){
      return request({
        url:`/menu`,
        method:'get'
      })
    },
    getArticleList(style){
      return request({
        url:`/articleList/${style}`,
        method:'get'
      })
    },
    delArticle(id){
      return request({
        url:`/${group_name}/del/${id}`,
        method:'post'
      })
    },
    getArticleComment(id){
      return request({
        url:`/${group_name}/comment/${id}`,
        method:'get'
      })
    },
    getComment(userid){
      return request({
        url:`/comment/user/${userid}`,
        method:'get'
      })
    },
    replyComment(userid,data){
      return request({
        url:`/comment/reply/${userid}`,
        method:'post',
        data:data
      })
    },
    delComment(id){
      return request({
        url:`/comment/del/${id}`,
        method:'get'
      })
    },


  // getList() {
  //   return request({
  //     url: `/${group_name}/${api_name}`,
  //     method: 'get'
  //   })
  // },
  // search(page, size, searchMap) {
  //   return request({
  //     url: `/${group_name}/${api_name}/search/${page}/${size}`,
  //     method: 'post',
  //     data: searchMap
  //   })
  // },
  // save(pojo) {
  //   return request({
  //     url: `/${group_name}/${api_name}`,
  //     method: 'post',
  //     data: pojo
  //   })
  // },
  // findById(id) {
  //   return request({
  //     url: `/${group_name}/${api_name}/${id}`,
  //     method: 'get'
  //   })
  // },
  // update(id, pojo) {
  //   if (id === null || id === '') {
  //     return this.save(pojo)
  //   }
  //   return request({
  //     url: `/${group_name}/${api_name}/${id}`,
  //     method: 'put',
  //     data: pojo
  //   })
  // },
  // deleteById(id) {
  //   return request({
  //     url: `/${group_name}/${api_name}/${id}`,
  //     method: 'delete'
  //   })
  // },
  // examine(id){
  //   return request({
  //     url: `/${group_name}/${api_name}/examine/${id}`,
  //     method: 'put'
  //   })
  // }
}
