var util = require('../../utils/util.js');
Page({
  // 页面的初始数据
  data: {
    date: '',
    date1: '',
    selected: true,
    selected1: false,
    articles: [],
    upload: true,
    files: [],
    sum: 0,
  },
  // 保存
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let data = e.detail.value;
    if (that.data.files[0] !== null) {
      data.certificate = that.data.files[0];
    }
    console.log(data);
    // wx.request({
    //   url: '####',
    //   method: 'POST',
    //   data: JSON.stringify(data),
    //   header: {
    //     'Authorization': 'Bearer' + wx.getStorageSync('token'),
    //   },
    //   success(res) {
    //     console.log("绑定", res);
    //     wx.showModal({
    //       title: '提示',
    //       content: res.data.msg,
    //       showCancel: false,
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定');
    //         }
    //       }
    //     })
    //   },
    //   fail: function (fail) {
    //     wx.showModal({
    //       title: '提示',
    //       content: '输入有误,请重新输入',
    //       showCancel: false,
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定');
    //         }
    //       }
    //     })
    //   }
    // })
  },
  // 时间
  changeDate(e) {
    this.setData({
      date: e.detail.value,
    });
  },
  changeDate1(e) {
    this.setData({
      date1: e.detail.value,
    });
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 获取当天时间
    var that = this;
    var time = util.formatTime(new Date()).substring(0, 10);
    console.log(time)
    that.setData({
      date: time,
      date1: time,
    });
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },

  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },
  // 生命周期函数--监听页面显示
  onShow: function () {

  },
  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },
  // 生命周期函数--监听页面卸载
  onUnload: function () {

  },
})