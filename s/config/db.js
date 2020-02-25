const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/blog'

mongoose
.connect(url, {useNewUrlParser:true})
.then(()=>{console.log("数据库连接成功");})
.catch(err =>{console.log(err.message);})
module.exports = mongoose;