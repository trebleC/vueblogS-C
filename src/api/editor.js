import request from '@/utils/request'
const api_name = 'editor'

export default{
    savedraft(articleMap){
        return request({
            url: `/${api_name}/md/save`,
            method: 'post',
            data:articleMap
        })
    },

    release(articleMap){
        return request({
            url: `/${api_name}/md/release`,
            method: 'post',
            data:articleMap
        })
    },

}