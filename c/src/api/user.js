import request from '@/utils/request'
const group_name = 'user'
export default {
  follow(target){
    return request({
      url:`/${group_name}/follow?target=${target}`,
      method:'get',

    })
  },
  unfollow(target){
    return request({
      url:`/${group_name}/unfollow?target=${target}`,
      method:'get',

      })
  },
  getFollowList(id){
    return request({
      url:`/${group_name}/followlist?id=${id}`,
      method:'get',
    })
  },



  getFanList(id){
    return request({
      url:`/${group_name}/fanlist?id=${id}`,
      method:'get',
    })
  },
  delFan(target){
    return request({
      url:`/${group_name}/delfan?target=${target}`,
      method:'get',

      })
  },

  getInfo(id){
    return request({
      url: `/${group_name}/info`,
      method: 'get',
      params:  id 
    })
  },
  updateInfo(form){
    return request({
      url:`/${group_name}/updateinfo`,
      method:'post',
      data:form
      })
  }
   
}
