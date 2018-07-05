var http = require("http");
var hostName = '127.0.0.1';
var port = 8080;

//help = MysqlHelper("118.89.154.196", "root", "y,z,t5528", "bmsy")
var mysql      = require('mysql');
var connection = mysql.createConnection({
      host     : '118.89.154.196',
      user     : 'root',
      password : 'y,z,t5528',
      database : 'bmsy'
});



function setRespenseHeader(res,tp){
    switch(tp){
        case 'html':{
            res.writeHead(200,{'Content-Type':'text/html'});
        }break;
        case 'text':{
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin',"*")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
        }break;
        default:{
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin',"*")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
        }break;
    }
}







var server = http.createServer(function(req, res) {
    
    var currentUrl = req.url;
    console.log('Get Request,url:'+ currentUrl);

    var result = '谢谢惠顾～'+currentUrl;
    switch(currentUrl){
        case '/api/BookList':
        {
            setRespenseHeader(res,'text');
            getBookList(res);

        }break;
        case '/api/BookDetailList':
        {
            setRespenseHeader(res,'text');
            getBookDetailList(res);

        }break;
        case '/h5/demo.html':
        {
            var fs = require('fs');
            var fPath = __dirname + '/demo.html';
            fs.readFile(fPath,'utf-8',function(err,data){
                if(err){

                    setRespenseHeader(res,'text');
                    res.end(err.message+' path:'+fPath);
                }
                else{
                    setRespenseHeader(res,'html');
                    res.end(data);
                }
            }); 
        }break;
        default:{
            result = result + '_default';
            setRespenseHeader(res,'html');
            res.end('<html lang="en"><head><meta charset="UTF-8"><title>Title</title><script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script></head><body><div style="border:10px solid black;width: 100%;display: flex">老司机～</div></body></html>');
        }break;
    }
    
});

server.listen(port, hostName, function() {
    console.log('service running at http://' + hostName + ':' + port);
    connection.connect();
});


/***   router         ***/
function urlPreProcess(url)
{
    var urlAry = url.split('/');
    console.log('urlPreProcess urlAry start');
    array.forEach(element => {
        console.log('urlPreProcess -- '+element);
    });
    console.log('urlPreProcess urlAry end');

    if(urlAry.length > 1){
        return urlAry[1];
    }
    else{
        return null;
    }
}

function urlRouter(url){
    switch(urlPreProcess(url)){
        case '/api/BookList':
        {
            setRespenseHeader(res,'text');
            getBookList(res);

        }break;
        case '/api/BookDetailList':
        {
            setRespenseHeader(res,'text');
            getBookDetailList(res);

        }break;
        case '/demo.html':
        {
            var fs = require('fs');
            var fPath = __dirname + '/demo.html';
            fs.readFile(fPath,'utf-8',function(err,data){
                if(err){

                    setRespenseHeader(res,'text');
                    res.end(err.message+' path:'+fPath);
                }
                else{
                    setRespenseHeader(res,'html');
                    res.end(data);
                }
            }); 
            
            //res.write();
            //res.end('<html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body><div style="border:10px solid black;width: 100%;display: flex">我是个html～～ Hi～老司机！！！</div></body></html>');
        }break;
        default:{
            result = result + '_default';
            setRespenseHeader(res,null);
            res.end(result);
        }break;
    }
}


/***   business         ***/

function getBookDetailList(res){
    
    connection.query('SELECT * from douban_book_info', function (error, results, fields) {
        var r = '无信息';
        if(error){
            console.log(error);
            r = error.message;
        }
        else{
           console.log(results);
           r =  JSON.stringify(results);
        }
      
        res.end(r);
    });   
}

function getBookList(res){
    
    connection.query('SELECT * from book_info', function (error, results, fields) {
        var r = '无信息';
        if(error){
            //if (error) throw error;
            //console.log(typeof results);
            console.log(error);
            r = error.message;
        }
        else{
            /*
            r = '';
            console.log(results);
            console.log('The results length is: ', results.length);
            results.forEach(element => {
                r = r + '\nBook_id:' + element.book_id + ',title:'+ element.title;
            });
            */
           console.log(results);
            //JSON.parse(string):可以转为js对象。
           r =  JSON.stringify(results);
        }
      
        res.end(r);
    });   
}

//

function getSQLLite(){
    //var fs = require("fs");
    //var file = "abcDB.sqlite";
    //var exists = fs.existsSync(file);
    /*
    if(!exists) {
        console.log("Creating DB file.");
        fs.openSync(file, "w");
    }
    */
    // var sqlite3 = require("sqlite3").verbose();
    // var db = new sqlite3.Database(file);

    //db.serialize(function() {
        /*
        if(!exists) {
            db.run("CREATE TABLE Stuff (thing TEXT)");
        }
    
        var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
    
        //Insert random data
        var rnd;
        for (var i = 0; i < 10; i++) {
            rnd = Math.floor(Math.random() * 10000000);
            stmt.run("Thing #" + rnd);
        }
    
        stmt.finalize();
        */
        //db.each("SELECT * FROM 'tb001'", function(err, row) {
            //console.log(row.tb001_id + ": " + row.txt001);
        //});
    //});
    
    //db.close();
}



