
var dbManager = require('./DB.js');
var util = require('./Utiliy.js');

var BusinessManager = {
    addBook(clientInfo,compelation){

        var _isbn = clientInfo['isbn'];

        console.log('BusinessManager scanISBN clientInfo-isbn: ' + clientInfo['isbn']);
        var _sql = 'insert into douban_book_info(isbn) values("'+ _isbn +'")' ;
        dbManager.mySelectWithSql(_sql,function(isSuccess, result){
            var _respStr = '';
            console.log('BusinessManager addBook sql1: '+ (isSuccess?'get result':result));
            var _rObj = new Object();;
            var _flag = false;
            if (isSuccess) {
                _rStr = '入信息库成功';
                _flag = true;
                /*
                    result
"{"fieldCount":0,"affectedRows":1,"insertId":525,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}"
                */
            }
            else{
                
                var _s = result.substring(0,23);
                if (_s == 'ER_DUP_ENTRY: Duplicate') {
                    _rStr = '信息库已存在';
                    _flag = true;
                } else {
                    _rStr = '入信息库时,' + result;
                }
                _rObj['msg'] = _rStr;
                /*
                result
                "ER_DUP_ENTRY: Duplicate entry '9787302426585' for key 'isbn'"
                */
            }
            if (_flag) {
                _sql = 'insert into books(b_ISBN) values("'+ _isbn +'")' ;
                dbManager.mySelectWithSql(_sql,function(isSuccess, result){
                    var _r = result;
                    if (isSuccess) {
                        /*
                        result
"{"fieldCount":0,"affectedRows":1,"insertId":256,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}"
                    */
                        var _rJson = JSON.parse(result);
                        _rObj['insertId'] = _rJson['insertId'];
                        _rStr += '\r\n录入书库成功,insertId：' + _rObj['insertId'] ; 
                    } else {
                        _rStr += '\r\n录入书库时,' + result ; 
                    }
                    _rObj['msg'] = _rStr;
                    var _ss =  JSON.stringify(_rObj);
                    console.log('BusinessManager addBook sql2: '+ (isSuccess?'get result':result));
                    if(compelation){
                        console.log('BusinessManager addBook: ' + _ss);
                        compelation(_ss,util.ResponseTpye.text);
                    }
                });
            } else {
                if(compelation){
                    var _ss =  JSON.stringify(_rObj);
                    console.log('BusinessManager addBook: ' + _ss);
                    compelation(_ss,util.ResponseTpye.text);
                }
            }
        });

    },
    scanISBN(clientInfo,compelation){

        console.log('BusinessManager scanISBN clientInfo-isbn: ' + clientInfo['isbn']);
        var _sql =
        //'select * from books where b_ISBN = 9787115461230'
        'select * from books where b_ISBN = ' + clientInfo['isbn'];
        dbManager.mySelectWithSql(_sql,function(isSuccess, result){
            
            console.log('BusinessManager scanISBN: '+ (isSuccess?'get result':result));
            if(compelation){
                console.log('BusinessManager scanISBN: ' + util.ResponseTpye.text);
                compelation(result,util.ResponseTpye.text);
            }

        });

    },
    getBookList(clientInfo,compelation){
        var _sql = 
        'SELECT DISTINCT a.b_id as id,c.title,a.b_ISBN as isbn,b.tp_name as tp,a.b_state as state '+
        'FROM books a ' +
        'inner join types b ON a.b_tid=b.tp_id ' +
        'inner join douban_book_info c ON a.b_ISBN = c.isbn' ;

        dbManager.mySelectWithSql(_sql,function(isSuccess, result){
            
            console.log('BusinessManager getBookList: '+ (isSuccess?'get result':result));
            if(compelation){
                console.log('BusinessManager getBookList: ' + util.ResponseTpye.text);
                compelation(result,util.ResponseTpye.text);
            }

        });
    },
    getTypeList(clientInfo,compelation){
        var _sql = 
        'SELECT t.tp_id as id,t.tp_name as name '+
        'FROM types as t';

        dbManager.mySelectWithSql(_sql,function(isSuccess, result){
            
            console.log('BusinessManager getTypeList: '+ (isSuccess?'get result':result));
            if(compelation){
                console.log('BusinessManager getTypeList: ' + util.ResponseTpye.text);
                compelation(result,util.ResponseTpye.text);
            }

        });
    },



    getOldBookList(clientInfo,compelation){
        dbManager.mySelectWithTableName('book_info',function(isSuccess, result){
            
            console.log('BusinessManager getOldBookList: '+ (isSuccess?'get result':result));
            if(compelation){
                console.log('BusinessManager getOldBookList: ' + util.ResponseTpye.text);
                compelation(result,util.ResponseTpye.text);
            }

        });
        /*
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
                *
               console.log(results);
                //JSON.parse(string):可以转为js对象。
               r =  JSON.stringify(results);
            }
          
            res.end(r);
        }); 
        */ 
    },
    getBookDetailList(info,compelation){
        /*
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
        */  
    },
    saveQuestInfo:function(info,compelation){
        console.log('saveQuestInfo:'+info);
        if(compelation){
            compelation('saveQuestInfo compelation',util.ResponseTpye.text);
        }
    },
};

var UrlRounterManager = {
    urlRounter:function(url,clientInfo,compelation){
        switch(url)
        {
            // case '/api/invited': {
            //     BusinessManager.saveQuestInfo(info,compelation);
            // } break;
            // case '/api/getOldBookList': {
            //     BusinessManager.getOldBookList(info,compelation);
            // } break;
            // case '/api/getBookDetailList': {
            //     BusinessManager.getBookList(info,compelation);
            // } break;
            case '/api/addBook':{
                BusinessManager.addBook(clientInfo,compelation);
            } break;
            case '/api/scanISBN':{
                BusinessManager.scanISBN(clientInfo,compelation);
            } break;
            case '/api/getBookList': {
                BusinessManager.getBookList(clientInfo,compelation);
            } break;
            case '/api/getTypeList': {
                BusinessManager.getTypeList(clientInfo,compelation);
            } break;
            default: {
                if(compelation){
                    compelation(null,2);
                }
            } break;
        }
        
    }
};

module.exports = UrlRounterManager;

