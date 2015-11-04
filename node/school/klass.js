var student = require('./student')

var teacher = require('./teacher')

function add(teacherName,studentes){
	teacher.add(teacherName)

	studentes.forEach(function(item,index){
       student.add(item)     
	})
}
exports.add = add

