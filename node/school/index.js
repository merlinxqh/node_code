var klass = require('./klass')

function add(klasses){
	klasses.forEach(function(item,index){
		var _klass=item
		var teacherName = item.teacherName
		var students = item.students
		klass.add(teacherName,students)
	})
}

var klasses2 = [{
	teacherName:'徐老师',
	students : ['学生1','学生2','学生3']
}]

add(klasses2)