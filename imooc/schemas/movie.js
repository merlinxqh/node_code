//模式
var mongoose = require('mongoose')

var MovieSchemas = mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
})

//为这个模式添加一个方法
MovieSchemas.pre('save',function(next){
   if(this.isNew){//新增情况
      this.meta.createAt = this.meta.updateAt = Date.now()
   }else{
   	  this.meta.updateAt = Date.now()
   }
   next()
})


//添加静态方法
MovieSchemas.statics = {
	fetch: function(cb){
        return this
          .find({})
          .sort('meta.updateAt')
          .exec(cb)
	},
	findById: function(id, cb){
		return this
		  .findOne({_id:id})
		  .exec(cb)
	}
}

//导出构造函数
module.exports = MovieSchemas