//加载express模块
var express = require('express')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var path = require('path')

var _ = require('underscore')



//加载mongoose模块
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/imooc')
var app = express()
//加载 movie模型
var Movie = require('./models/movie.js')

var User = require('./models/user.js')

//设置模板路径
app.set('views','./views/pages')
//设置模板引擎
app.set('view engine','jade')

//处理表单提交 相关
//配置静态文件(js css)路径
app.use(serveStatic('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.locals.moment = require('moment')

//监听这个端口
app.listen(port)
console.log('imooc started on port '+port)

//路由编写
//index page
app.get('/',function(req,res){

   Movie.fetch(function(err,movies){
     if(err){
       console.log(err)
     }
     res.render('index',{
          title : 'imooc 首页',
          movies : movies
     })
   })

})

//详情页
app.get('/movie/:id',function(req,res){
  var id = req.params.id
  Movie.findById(id,function(err,movie){
     res.render('detail',{
     	  title: 'imooc '+movie.title,
        movie: movie
     })    
  })
})

//列表页
app.get('/admin/list',function(req,res){
  Movie.fetch(function(err,movies){
     if(err){
       console.log(err)
     }
     res.render('list',{
     	  title : 'imooc 列表页',
        movies:movies
     })
  })
})

//后台录入页
app.get('/admin/movie',function(req,res){
   res.render('admin',{
   	  title : 'imooc 后台录入页',
      movie:{
        doctor: '',
          country: '',
          title : '',
          year: '',
          poster : '',
          // poster : 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
          language: '',
          // flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
          flash: '',
          summary: ''
          // summary: '这里是一片很长的影片简介这里是一片很长的影片简介这里是一片很长的影片简介这里是一片很长的影片简介这里是一片很长的影片简介'
      }
   })
})

//admin update movie
app.get('/admin/update/:id',function(req,res){
    var id = req.params.id
    if(id){
      Movie.findById(id,function(err,movie){
         if(err){
          console.log(err)
         }
         res.render('admin',{
           title:'imooc 后台更新页',
           movie:movie
         })
      })
    }
})

//admin post movie 表单提交
app.post('/admin/movie/new',function(req,res){
   //先判断是否有数据ID
   var id = req.body.movie._id
   //拿到表单提交的数据
   var movieObj = req.body.movie
   var _movie
   if(id !== 'undefined'){
    //更新操作
    Movie.findById(id,function(err,movie){
       if(err){
          console.log(err)
       }
       //类似jquery的extend
       _movie = _.extend(movie,movieObj)
       _movie.save(function(err,movie){
          if(err){
            console.log(err)
          }
          //重定向跳转至详情页
          res.redirect('/movie/'+movie._id)
       })
    })
   }else{//新增数据
       _movie = new Movie({
          doctor: movieObj.doctor,
          title: movieObj.title,
          language: movieObj.language,
          summary: movieObj.summary,
          poster: movieObj.poster,
          flash: movieObj.flash,
          country: movieObj.country,
          year: movieObj.year
       })
       console.log(movieObj)

       _movie.save(function(err,movie){
          if(err){
            console.log(err)
          }
          //重定向跳转至详情页
          res.redirect('/movie/'+movie._id)
       })
   }
})

//删除方法
app.delete('/admin/list',function(req,res){
  //因为参数id是通过 url?方式传递 所以用 query获取
  var id = req.query.id
  if(id){
    Movie.remove({_id:id},function(err,movie){
       if(err){
        console.log(err)
       }else{
        res.json({success: 1})
       }

    })
  }
})

// app.post('/user/signup', function(req, res))

//sign in
app.post('/user/signup', function(req, res){
  //获取表单提交数据
  var _user = req.body.user
  // req.param('user')  这种方式  是 req.body.xxxx ({id:1213}) 和 req.params.xxxx  (/:id) 和 req.query.xxxx (?id=...)的封装
  //优先级  先params 后 body 最后query
  var user = new User(_user)
  user.save(function(err, user){
     if(err){
      console.log(err)
     }
     res.redirect('/admin/userlist')
  })
})

//用户列表页
app.get('/admin/userlist',function(req, res){
  User.fetch(function(err, users){
     if(err){
       console.log(err)
     }
     res.render('userlist',{
        title : 'imooc 用户列表页',
        users: users
     })
  })
})