const express = require('express')
const app = express()

let indexRouter = require('./routes/index')

app.use(indexRouter)
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 8090); // 设定监听端口
 
//启动监听
var server = app.listen(app.get('port'), function() {
debug('Express server listening on port ' + server.address().port);
});
 console.log("STARTED");
//module.exports = app;//这是 4.x 默认的配置，分离了 app 模块,将它注释即可，上线时可以重新改回来