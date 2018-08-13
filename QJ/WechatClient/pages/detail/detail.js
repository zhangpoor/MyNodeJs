// pages/detail/detail.js

var mockData = require('../../data/mock_data_detail.js');  
const YZTRequest = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'xxx',
    book_id: '',
    book:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('enter detail page');
    console.log(options.jsonStr);

    let book = JSON.parse(this.jsonfilter(options.jsonStr));
    
    this.setData({
      book: this.handleBook(book)
    });

    this.requestBookDetail();
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

  jsonfilter: function (string) {
    var reg = /[\u0000-\u001f\u000B\u000C\u00A0\uFEFF\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]/g;
    return string.replace(reg, " ");
  },

  requestBookDetail: function () {
    var that = this;
    wx.showLoading({
      title: '请求中',
      mask: true
    })
    YZTRequest.request({
      operationType: YZTRequest.operationTypes.operationType_book_detail,
      data: {
        isbn : that.data.book.ISBN,
      },
      success: function (res) {
        let book = res.data.book_list[0] || {};
        console.log(book.catalog);

        that.setData({
          book: that.handleBook(book)
        });
      },
      fail: function (e) {
        wx.showToast({ title: e.errMsg, icon: 'none' });
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    });
  },

  handleBook: function (book) {
    //容错
    book.img = book.img || '';
    book.name = book.name || book.title || '--';
    book.author = book.author || '--';
    book.publisher = book.publisher || '--';
    book.pubdate = book.pubdate || '--';
    book.average = book.average || '--';
    book.summary = book.summary || '--';
    book.catalog = book.catalog || '--';

    return book;
  },

  imgPreview: function () {
    if(this.data.book.img.length > 0) {
      wx.previewImage({
        urls: [this.data.book.img],
      })
    }
  }
})