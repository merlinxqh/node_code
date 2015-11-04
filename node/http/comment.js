//灌水帖....

var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
'ie':'utf-8',
'kw':'红豆爱阿翁',
'fid':'1560023',
'tid':'4068612182',
'vcode_md5':'',
'floor_num':2976,
'rich_text':1,
'tbs':'1801879ed71cbe311445610164',
'content':'再试试百度贴吧',
'files':[],
'mouse_pwd':'51,48,55,41,55,52,54,51,54,12,52,41,53,41,52,41,53,41,52,41,53,41,52,41,53,41,52,41,53,12,54,61,55,53,61,12,52,60,55,53,41,52,53,61,53,14456101592050',
'mouse_pwd_t':1445610159205,
'mouse_pwd_isclick':0,
'__type__':'reply'
});

var options = {
	'hostname':'www.tieba.baidu.com',
	'port' : 80,
	'path' : '/f/commit/post/add',
	'method' : 'POST',
	'headers' : {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'BAIDUID=C9FED4AA398546F60CBEE1DAC132D490:FG=1; TIEBA_USERTYPE=41c9ade83fcaffa7b5eb5fcf; bdshare_firstime=1432216681529; BDUSS=GJsUFZ6UHQ2eXZTfmhRTlN1akpqb01pfjBDMlBqSDlMN2U4STFjeFZZWGxjWVZWQVFBQUFBJCQAAAAAAAAAAAEAAAAI6iQbd29haXh1cWlhbmdodWkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOXkXVXl5F1VT; TIEBAUID=240918a987c34301be3f83fb; BIDUPSID=C9FED4AA398546F60CBEE1DAC132D490; PSTM=1433337026; platform_float_hide_sbs=1; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; H_PS_PSSID=17520_1466_17619_17640_14431_17000_17471_17072_15149_11938_16011_17051; wise_device=0; LONGID=455404040',
		'Host':'tieba.baidu.com',
		'Origin':'http://tieba.baidu.com',
		'Referer':'http://tieba.baidu.com/p/4068612182',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
};

var req = http.request(options,function(res){
   console.log('status: '+res.statusCode);
   console.log('headers: '+JSON.stringify(res.headers));
   res.on('data',function(chunk){
         console.log(Buffer.isBuffer(chunk));
         console.log(typeof chunk);
   });
   res.on('end',function(){
        console.log('评论完毕');
   });
});

req.on('error',function(e){
    console.log('Error: ' +e.message);
});

req.write(postData);
req.end();//请求结束




