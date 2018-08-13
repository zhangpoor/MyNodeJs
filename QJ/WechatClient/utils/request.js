const hostUrl = "https://www.oneconnect.club";
// const hostUrl = "http://172.18.16.13"
const operationType_back_lend = "lend/back_lend";
const operationType_lend_list = "lend/lend_list";
const operationType_query_user = "user/query_user";
const operationType_add_user = "user/add_user";
const operationType_add_lend = "lend/add_lend";
const operationType_book_list = "book/book_list";
const operationType_barcode_add = "barcode/add_barcode";
const operationType_book_detail = "book/book_detail";
const operationType_delete_user = "user/delete_user";

const operationTypes = {
  operationType_back_lend, //归还
  operationType_lend_list, //本人借阅信息
  operationType_query_user,//用户信息
  operationType_add_user,  //绑定用户
  operationType_add_lend,  //借阅
  operationType_book_list,  //书库列表
  operationType_barcode_add, //录入图书ISBN号
  operationType_book_detail, //书籍详情页面
  operationType_delete_user, //注销用户
}

const request = function ({ operationType, data, success, fail, complete }) {
  let url = hostUrl + '/api/' + operationType + '.php';

  console.log({ operationType, url, data });

  let requestInfo = {
    url,
    header: {
      "content-Type": "application/x-www-form-urlencoded",
    },
    data: data || {},
    success: function (res) {
      console.log('operationType :: ' + operationType + " ::: " + 'success');
      if (res.data.status == 10000) {
        typeof (success) === 'function' && success(res);
      } else {
        typeof (fail) === 'function' && fail({ errMsg: res.data.msg });
      }
    },
    fail: function (f) {
      //{errMsg:"request:fail"}
      console.log('operationType :: ' + operationType + " ::: " + 'fail');
      typeof (fail) === 'function' && fail(f);
    },
    complete: function (e) {
      console.log('operationType :: ' + operationType + " ::: " + 'complete');
      console.log(e);

      // console.log(JSON.stringify(e));

      typeof (complete) === 'function' && complete(e);
    }
  }
  wx.request(requestInfo);
};

module.exports = {
  request,
  operationTypes
};