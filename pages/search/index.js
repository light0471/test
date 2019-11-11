// pages/search/index.js
var config = require('../utils/config.js');
var http = require('../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    search_key: '',
    test: '课件下载'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  tonewrouter: function(e) {
    wx.navigateTo({
      url: e.target.dataset.nrouter,
    })
  },
  inputTyping: function (e) {
    this.setData({
      search_key: e.detail.value
    });
  },
  // 搜索方法
  search: function () {
    let that = this
    let params = {
      search_key: this.data.search_key
    }
    http.post({
      url: config.service.list_srouter,
      data: params
    }, (res) => {
      if (res.data.errcode == 0) {
        console.log('--', res)
        that.setData({
          lists: res.data.items
        })
      }
    })
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

  }
})