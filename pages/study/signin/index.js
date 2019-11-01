// pages/study/signin/index.js
const app = getApp()
Page({
data: {
  mystatus: [],  // 状态    0:未打卡 1:打卡  
  circle_show:true,
  message:""
  },
onLoad:function() {
  //发起状态请求，在请求成功后，定义mystatus

  // 例子就不写请求了，直接定义如下
  this.setData({
    mystatus: [1, 1, 0, 1, 1, null, null, 1, 1, 0, 0, null, 1, 1, null, 0, 1, null, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, null,0]
  })
},
selectDate: function(e){
  // console.log(e.detail.status)
  const date = e.detail.date;
  const week = e.detail.week;
  var statustext;
  if (e.detail.status == 1) {
    statustext = "打卡成功"
  } else if (e.detail.status == 0) {
    statustext = "未打卡"
  } else {
    statustext = ""
  }
  // wx.showModal({
  //   title: '信息',
  //   content: '当前时间：' + date + ' ' + week + ' ' + statustext
  // });
  this.setData({
    message: date + ' ' + week + ' ' + statustext
  })
},

})