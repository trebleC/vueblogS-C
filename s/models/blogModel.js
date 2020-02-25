const db = require('../config/db')

const blogSchema = new db.Schema({
    account: {
        type: String, //类型首字母大写
        required: true  //定义必须存在
      },
    
      author: {
        type: String,
        default: 18 
      },
    
      password: {
        type: String,
        default: 1
      },

      posts: {
        type: Array,
        default: 1
      },

})

module.exports = db.model('blogM',blogSchema)