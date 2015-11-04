//引入events模块
var EventEmitter = require('events').EventEmitter
//实例化对象
var life = new EventEmitter()

//设置最多监听事件数量  (默认10个)
life.setMaxListeners(11)

//设置多个监听事件
var fun = function(who){
   console.log(who + ' need Girl friend.1.')
}

life.on('needGF',fun)

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.2.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.3.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.4.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.5.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.6.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.7.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.8.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.9.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.10.')
})

life.on('needGF',function(who){
   console.log(who + ' need Girl friend.11.')
})

life.on('needBF',function(who){
   console.log('this is need bf '+ who)
})

//移除某个监听事件
life.removeListener('needGF',fun)
//移除所有监听事件 (不传)
life.removeAllListeners('needGF')

//返回boolean值,表示 事件名是否被监听
var hasNeedGFListeners = life.emit('needGF','me')
var hasNeedBFListeners = life.emit('needBF','everyone')
var hasListeners = life.emit('needBFTemp','everyone')


//事件是否被监听
// console.log(hasNeedGFListeners)
// console.log(hasNeedBFListeners)
// console.log(hasListeners)

//获取监听的事件数量
console.log(life.listeners('needGF').length)
// console.log(EventEmitter.listenerCount(life,'needGF'))
console.log(life.listeners('needBF').length)
