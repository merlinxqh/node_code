var http = require("http")

http.createServer(function(req,res){
   res.writeHead(200,{'Content-Type':'text/plain'})
   res.write('Hello node.js')
   res.end()
}).listen(2015)