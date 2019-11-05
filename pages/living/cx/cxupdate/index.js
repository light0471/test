const app = getApp();
var config = require('../../../utils/config.js');
var http = require('../../../utils/http.js');

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: "0",
    vehicle_index: "0",
    picker: ['火车', '飞机'],
    vehicle_picker: ['太原武宿机场', '太原南站', '太原站', '忻州站', '忻州西站', '其他'],
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
    this.setData({
      index: e.detail.value
    })
  },
  VehiclePickerChange(e) {
    this.setData({
      vehicle_index: e.detail.value
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
  release(e) {
    let params = {
      v_person: this.data.title,
      v_type: this.data.index,
      v_distination: this.data.vehicle_index,
      v_time: this.data.date + " " + this.data.time + ":00",
      des: this.data.textareaAValue
    }
    http.post({
      url: config.service.save_cx,
      data: params
    }, (res) => {
      if (res.data.errcode == 0) {
        // 跳转
        wx.redirectTo({
          url: '../index',
        })
      }
    })
  }
})