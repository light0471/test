const app = getApp();
var config = require('../../../utils/config.js');
var http = require('../../../utils/http.js');

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: "0",
    picker: ['篮球', '羽毛球', '乒乓球'],
    time: '12:01',
    date: '2018-12-25',
    textareaAValue: '',
    title: ''
  },
  onLoad: function (options) {
    var that = this;
    let myDate = new Date()
    that.setData({
      date: myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate(),
      time: myDate.getHours() + ":" + myDate.getMinutes()
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  inputTyping: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  back() {
    wx.navigateBack();
  },
  release(e) {
    let params = {
      title: this.data.title,
      type: this.data.index,
      time: this.data.date + " " + this.data.time + ":00",
      location: this.data.textareaAValue
    }
    console.log("--params", params)
    http.post({
      url: config.service.save_yl,
      data: params
    }, (res) => {
      if (res.data.errcode == 0) {
        // 跳转
        wx.navigateBack();
      }
      console.log(res)
    })
  }
})