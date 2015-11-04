var http = require('http')
var cheerio = require('cheerio')

var url = 'http://www.imooc.com/learn/348'


//解析html
function filterCapters(html){
	var $ = cheerio.load(html)
	//期望数据结构
	// [{
	// 	chapterTitle:'',
	// 	videos:[
 //           {
 //           	title:'',
 //           	id:''
 //           }  
	// 	]
	// }]
	//课程数据
    var courseData  = []
	var chapters = $('.chapter')
	chapters.each(function(){
		var course = {}
		var chapter = $(this)
		var chapterTitle = chapter.find('strong').text()//章节标题
		course.chapterTitle = chapterTitle

		var videslist = []
		//里面章节内容
		var videos = chapter.find('.video').children('li')

		videos.each(function(item,index){
            var obj = {}
            var aobj = $(this).find('.studyvideo')

            obj.title = aobj.text()
         
            var id = aobj.attr('href').split('video/')[1]
            
            obj.id = id
            videslist.push(obj)
		})
		course.videos = videslist
		courseData.push(course)
	})
    printCourseData(courseData)
}

function printCourseData(courseData){
	courseData.forEach(function(item){
       console.log(item.chapterTitle + '\n')
       item.videos.forEach(function(video){
       	   console.log(video.id + '[' + video.title + ']')
       })
	})
}

http.get(url,function(res){
	var html = ''
    res.on('data',function(data){
        html += data
    })

    res.on('end',function(){
    	filterCapters(html)
    })
}).on('error',function(){
	console.log('读取数据出错啦!!')
})