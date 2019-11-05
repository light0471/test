//index.js
//获取应用实例
var config = require('../../utils/config.js');
var http = require('../../utils/http.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    search_key: '',
    lists: []
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    this.getList()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  inputTyping: function (e) {
    this.setData({
      search_key: e.detail.value
    });
  },
  search_data: function (e) {
    console.log("--", this.data.search_key)
    this.getList()
  },
  getList: function (e) {
    let that = this
    let params = { search_key: this.data.search_key}
    http.post({
      url: config.service.list_yl,
      data: params
    }, (res) => {
      if (res.data.errcode == 0) {
        that.setData({
          lists: res.data.items
        })
      }
      console.log(res)
    })
  },
  back() {
    wx.navigateBack();
  },
  new_yl(e) {
    wx.navigateTo({
      url: './ylupdate/index',
    })
  }
})
