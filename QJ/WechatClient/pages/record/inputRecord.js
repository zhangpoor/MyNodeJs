// pages/record/inputRecord.js
const constant = require('../../utils/constant.js');  
const YZTRequest = require('../../utils/request.js');

Page({

  data: {
      book_id:'',
      user_id:'',
      open_id: '',
      email: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      open_id:options.open_id,
      email:options.email
    });  
  },

  bindKeyInputUserId: function (e) {
    this.setData({
      user_id: e.detail.value
    })
  },

  bindKeyInputBookId: function (e) {
    this.setData({
      book_id: 'YZT'+e.detail.value
    })
  },

  inputRecord: function() {
      this.borrowBook();
  },

  borrowBook: function (par) {
    console.log(par);
    var that = this;
    YZTRequest.request({
      operationType: YZTRequest.operationTypes.operationType_add_lend,
      data: {
        book_id: this.data.book_id,
        user_id: this.data.user_id
      },
      success: function (res) {
        wx.showToast({
          title: '等待管理员确认',
        });
      },
      fail: function (e) {
        wx.showToast({ title: e.errMsg, icon: 'none' });
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  },

  deleteUser: function() {
    console.log(this.data);

    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '请问你确定要注销当前用户么？',
      success: function (res) {
        if (res.confirm) {
          that.requestDeleteUser();
        }
      }
    })
  },

  requestDeleteUser: function () {
    var that = this;
    wx.showLoading({
      title: '注销中',
      mask: true
    });
    YZTRequest.request({
      operationType: YZTRequest.operationTypes.operationType_delete_user,
      data: {
        open_id: this.data.open_id,
        email: this.data.email
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '注销成功!',
        });
      },
      fail: function (e) {
        wx.hideLoading();
        wx.showToast({ title: e.errMsg, icon: 'none' });
      },
      complete: function () {
      }
    });
  }
})