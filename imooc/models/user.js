//模型  账号
var mongoose = require('mongoose')
//加载 模式
var UserSchemas = require('../schemas/user.js')
var User = mongoose.model('User', UserSchemas)

//导出构造函数
module.exports = User