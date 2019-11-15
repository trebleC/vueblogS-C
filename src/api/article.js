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
        url:`/${group_name}/menu`,
        method:'get'
      })
    },
    getArticleList(style){
      return request({
        url:`/articleList/${style}`,
        method:'get'
      })
    },
    getComment(id){
      return request({
        url:`/${group_name}/comment/${id}`,
        method:'get'
      })
    },
    delArticle(id){
      return request({
        url:`/${group_name}/del/${id}`,
        method:'post'
      })
    }

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
