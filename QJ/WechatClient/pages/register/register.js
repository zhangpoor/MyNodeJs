// pages/register/register.js
const constant = require('../../utils/constant.js');
const YZTRequest = require('../../utils/request.js');
const Utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_id: '',
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      open_id: options.open_id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  registerHandle: function () {
    console.log(this.data.open_id);
    console.log(this.data.inputValue);
    if (!this.data.inputValue) {
      wx.showToast({
        title: 'UM不能为空',
        icon: 'none'
      })
      return;
    }
    var that = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '账号绑定中',
      mask: true
    });
    YZTRequest.request({
      operationType: YZTRequest.operationTypes.operationType_add_user,
      data: {
        open_id: this.data.open_id,
        email: this.data.inputValue
      },
      success: (res) => {
        wx.hideLoading();
        Utils.showSuccessMsg('绑定成功!');
        setTimeout((e) => {
          this.backRefreshHomePage();
        }, 1500);
      },
      fail: function (e) {
        wx.hideLoading();
        Utils.showErrorMsg(e.errMsg);
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  },

  backRefreshHomePage: function () {
    //获取页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里
      prePage.setData({
        isNeedRefresh: true,
      });
    }
    wx.navigateBack({

    });
  }
})