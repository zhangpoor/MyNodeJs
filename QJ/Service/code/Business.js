
var dbManager = require('./DB.js');
var util = require('./Utiliy.js');

var BusinessManager = {
    getBookList(info,compelation){
        dbManager.mySelect('book_info',function(isSuccess, result){
            
            console.log('BusinessManager getBookList: '+ isSuccess?'get result':result);
            if(compelation){
                console.log('BusinessManager getBookList: ' + util.ResponseTpye.text);
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
    
    
    urlRounter:function(url,info,compelation){
        
        console.log('urlRounter_url:' + url + '\r\nInfo:' + info);
        switch(url)
        {
            case '/api/invited': {
                BusinessManager.saveQuestInfo(info,compelation);
            } break;
            case '/api/getBookList': {
                BusinessManager.getBookList(info,compelation);
            } break;
            case '/api/getBookDetailList': {
                BusinessManager.getBookList(info,compelation);
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

