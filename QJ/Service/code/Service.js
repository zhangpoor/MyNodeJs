var http = require("http");
var util = require('./Utiliy.js');




/*** Service ***/
var UrlRounterManager = require('./Business.js');
var server = http.createServer(function(resq, resp) {
    
    var currentUrl = resq.url;
    console.log('\r\n');
    console.log('Get Request,url:   '+ currentUrl);
    console.log('Method:   '+ resq.method);
    

    if(resq.method == 'POST'){
        let rs = '';
        resq.on('data', (data) => {
            console.log('开始接收数据');
            rs += data;
        });
        resq.on('end', () => {
            var params = JSON.parse(rs);
            console.log('数据接收完毕：' + params);
            processResponse(resp,params,currentUrl);
        });
    }else{

        processResponse(resp,'hello',currentUrl);
    }   
});

function processResponse(resp,clientInfo,url){
    UrlRounterManager.urlRounter(url,clientInfo,function(info,tp){
        setRespenseHeader(resp,tp);
        var result = '出错啦～谢谢惠顾～url:   '+url;
        var r = info ? info : result;
        resp.end(r);
        console.log('\r\n');
        console.log('Send Result:' + r.length + '\r\nType:'+tp);
    });
}



var DBManager = require('./DB.js');
server.listen(util.port, util.hostName, function() {
    console.log('service running at http://' + util.hostName + ':' + util.port);
    DBManager.connectDB();
});


/*** Tools ***/
/** setResponseHeader **/
function setRespenseHeader(resp,RsTp){
    switch(RsTp){
        case util.ResponseTpye.html:{
            console.log('setRespenseHeader: tp_html');
            resp.writeHead(200,{'Content-Type':'text/html'});
        }break;
        case util.ResponseTpye.text:{
            console.log('setRespenseHeader: tp_text');
            resp.setHeader('Content-Type', 'text/plain');
            resp.setHeader('Access-Control-Allow-Origin',"*")
            resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
        }break;
        default:{
            console.log('setRespenseHeader: tp_unkonw');
            resp.setHeader('Content-Type', 'text/plain');
            resp.setHeader('Access-Control-Allow-Origin',"*")
            resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
        }break;
    }
}

