//模型
var mongoose = require('mongoose')
//加载 模式
var MovieSchemas = require('../schemas/movie.js')
var Movie = mongoose.model('Movie', MovieSchemas)

//导出构造函数
module.exports = Movie