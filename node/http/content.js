//上下文
// var pet={
// 	words:'...',
// 	speek:function(){
// 		console.log(this.words)
// 		console.log(this === pet)
// 	}
// }

// pet.speek()

// function pet(words){
// 	this.words = words
// 	console.log(this.words)
// 	console.log(this === global)
// }

// pet('adsfasd')

function Pet(words){
	this.words = words
	this.speek = function(){
		console.log(this.words)
	}
}

var cat = new Pet('fffffff')
cat.speek()