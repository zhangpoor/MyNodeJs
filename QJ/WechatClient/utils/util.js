const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/* n天后的日期  */
function addDateStr(today, addDayCount) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
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


const showErrorMsg = (e) => {
  wx.showToast({
    title: e || '系统错误',
    icon: 'none',
    mask: true
  })
}

const showLoadingMsg = (e) => {
  wx.showToast({
    title: e,
    icon: 'loading',
    mask: true,
    duration: 500
  })
}

const showSuccessMsg = (e) => {
  wx.showToast({
    title: e || '操作成功',
    icon: 'success',
    mask: true
  })
}

const hideHud = (e) => {
  wx.hideToast();
}

const isEmptyString = (e) => {
  if (e == null || e == undefined || e == '') {
    return true;
  }
  return false;
}

const openUrl = (url) => {
  console.log(url);
  console.log(encodeURIComponent(url));
  wx.navigateTo({
    url: '/pages/web/web?url=' + encodeURIComponent(url),
  })
}

module.exports = {
  formatTime: formatTime,
  addDateStr: addDateStr,
  showErrorMsg,
  showSuccessMsg,
  showLoadingMsg,
  hideHud,
  isEmptyString,
  openUrl
}
