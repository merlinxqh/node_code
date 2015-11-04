//模式
var mongoose = require('mongoose')
var SALT_WORK_FACTOR = 10
//加密 模块
var bcrypt = require('bcrypt')

var UserSchemas = mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,
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
UserSchemas.pre('save',function(next){
	var use = this
   if(this.isNew){//新增情况
      this.meta.createAt = this.meta.updateAt = Date.now()
   }else{
   	  this.meta.updateAt = Date.now()
   }
   
   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      if(err) return next(err)

      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err)
        
        user.password = hash
        next()
      })
   })

   next()
})


//添加静态方法
UserSchemas.statics = {
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
module.exports = UserSchemas