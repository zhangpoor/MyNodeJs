var http = require("http");
var hostName = '127.0.0.1';
var port = 8080;


var mysql      = require('mysql');
var connection = mysql.createConnection({
      host     : '159.65.97.244',
      user     : 'root',
      password : 'f,d,r5080',
      database : 'bmsy'
});


var server = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 


    var currentUrl = req.url;
    console.log('Get Request,url:'+ currentUrl);

    var result = '谢谢惠顾～';
    switch(currentUrl){
        case '/api/BookList':
        {
            getBookList(res);

        }break;
        case '/api/BookDetailList':
        {
            getBookDetailList(res);

        }break;
        default:{
            res.end(result);
        }break;
    }
});

server.listen(port, hostName, function() {
    console.log('service running at http://' + hostName + ':' + port);
    connection.connect();
});
5

function getBookDetailList(req){
    
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
      
        req.end(r);
    });   
}

function getBookList(req){
    
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
      
        req.end(r);
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



