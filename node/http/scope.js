///作用域
var globalVariable = 'This is a golbal variable ..'

function globalFun(){
   var localVariable = 'This is a local variable..'

   function innerFun(){
   	  var innerVarible = 'This is a inner variable..'
   	  console.log(globalVariable)
   	  console.log(localVariable)
   }
}