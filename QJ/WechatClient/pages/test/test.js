function initSubMenuDisplay() {
  return ['hidden', 'hidden'];
}


function getDateStr(today, addDayCount) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  console.log(dd);

  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 



  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}

function style001() {

  return 'background-color:red;width:200rpx;height:200rpx;';
}
Page({
  data: {
    style001Value: style001(),
    subMenuDisplay: initSubMenuDisplay()
  },
  // tapMainMenu: function (e) {
  //   //        获取当前显示的一级菜单标识
  //   var index = parseInt(e.currentTarget.dataset.index);
  //   // 生成数组，全为hidden的，只对当前的进行显示
  //   var newSubMenuDisplay = initSubMenuDisplay();
  //   //        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
  //   if (this.data.subMenuDisplay[index] == 'hidden') {
  //     newSubMenuDisplay[index] = 'show';
  //   } else {
  //     newSubMenuDisplay[index] = 'hidden';
  //   }
  //   // 设置为新的数组
  //   this.setData({
  //     subMenuDisplay: newSubMenuDisplay
  //   });
  // },

  itemStateAction: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);

    this.setData({
      subMenuDisplay: initSubMenuDisplay()
    });
  },

  itemContentAction: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    this.setData({
      subMenuDisplay: initSubMenuDisplay()
    });
  },

  testAction: function() {
   var dayString =  getDateStr('2018-04-24', 10);
   console.log(dayString);
  }
  
  
});

