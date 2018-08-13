const constant = require('../../utils/constant.js');
const YZTRequest = require('../../utils/request.js');

Page({
  data: {
    code: '',
    bookId: '',
    formatBookId: ''
  },

  scanBarCodeAction: function () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        let code = res.result
        if (code && code.length == 13) {
          this.setData({ code })

        } else {
          wx.showToast({
            icon: 'none',
            title: '非法图书ISBN码，请重新试下'
          })
        }
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '扫描失败，请重新试下'
        })
      }
    });
  },
  bindKeyInputBookId: function (e) {
    this.setData({
      formatBookId: e.detail.value,
      bookId: 'YZT' + e.detail.value
    })
  },
  onSubmitBook: function () {
    let code = this.data.code
    if (code.length == 0) {
      wx.showToast({
        title: '请扫描图书ISBN码',
        icon: 'none',
      })
      return;
    }
    let bookId = this.data.bookId
    if (bookId.length == 0) {
      wx.showToast({
        title: '请输入图书id',
        icon: 'none',
      })
      return;
    }
    wx.showLoading({
      title: '图书ISBN录入中...',
    });
    YZTRequest.request({
      operationType: YZTRequest.operationTypes.operationType_barcode_add,
      data: this.data,
      success: res => {
        wx.hideLoading();
        wx.showToast({ title: res.data.msg, icon: 'none' });
        this.setData({
          code: '',
          bookId: '',
          formatBookId: ''
        })
      },
      fail: e => {
        wx.hideLoading();
        wx.showToast({ title: e.errMsg, icon: 'none' });
      },
    });
  }
})