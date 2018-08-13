var http = require("http");
var util = require('./Utiliy.js');




/*** Service ***/
var UrlRounterManager = require('./Business.js');
var server = http.createServer(function(req, res) {
    
    var currentUrl = req.url;
    console.log('Get Request,url:   '+ currentUrl);
    console.log('\r\n');
    var result = '出错啦～谢谢惠顾～url:   '+currentUrl;

        
    UrlRounterManager.urlRounter(currentUrl,'hello',function(info,tp){
        setRespenseHeader(res,tp);

        var r = info ? info : result;
        res.end(r);
        console.log('\r\n');
        console.log('Send Result:' + r.length + '\r\nType:'+tp);
    });
});


var DBManager = require('./DB.js');
server.listen(util.port, util.hostName, function() {
    console.log('service running at http://' + util.hostName + ':' + util.port);
    DBManager.connectDB();
});


/*** Tools ***/
/** setResponseHeader **/
function setRespenseHeader(res,RsTp){
    switch(RsTp){
        case util.ResponseTpye.html:{
            console.log('setRespenseHeader: tp_html');
            res.writeHead(200,{'Content-Type':'text/html'});
        }break;
        case util.ResponseTpye.text:{
            console.log('setRespenseHeader: tp_text');
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin',"*")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
        }break;
        default:{
            console.log('setRespenseHeader: tp_unkonw');
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin',"*")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
        }break;
    }
}

