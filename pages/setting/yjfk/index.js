// pages/setting/yjfk/index.js
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
    lists: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getList()
      wx.getStorage({
          key: 'skins',
          success: function (res) {
              that.setData({
                  SkinStyle: res.data
              })
          },
      })
  },
  getUserInfo: function (e) {
    console.log("===="+e)
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
  getList: function (e) {
    let that = this
    let params = {}
    http.post({
      url: config.service.list_yjfk,
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
  
  creatyj(e) {
    wx.redirectTo({
      url: './yjfk/index',
    })
  },
})