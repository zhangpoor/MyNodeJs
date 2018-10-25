var util = require('./Utiliy.js');

var mysql      = require('mysql');
var connection = mysql.createConnection({
      host     : util.dbHost,
      user     : util.dbUser,
      password : util.dbPassword,
      database : util.dbDatabase
});


var DBManager = {
    connectDB(){
        connection.connect();
    },
    mySelectWithSql(sql,compelation){
        connection.query(sql, function (error, results, fields) {
            var r = '无信息';
            var isOk = true;
            if(error){
                console.log('DBManager: ' + error);
                r = error.message;
                isOk = false;
            }
            else{
               r =  JSON.stringify(results);
            }
          
            if(compelation){
                compelation(isOk, r);
            }
        });  
    },
    mySelectWithTableName(tableName,compelation){
        connection.query('SELECT * from ' + tableName, function (error, results, fields) {
            var r = '无信息';
            var isOk = true;
            if(error){
                //if (error) throw error;
                //console.log(typeof results);
                console.log('DBManager: ' + error);
                r = error.message;
                isOk = false;
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
               //console.log('DBManager: ' + results);
                //JSON.parse(string):可以转为js对象。
               r =  JSON.stringify(results);
            }
          
            if(compelation){
                compelation(isOk, r);
            }
        });  
    },
};

module.exports = DBManager;