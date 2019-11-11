const app = getApp()
var config = require('../../../utils/config.js');
var http = require('../../../utils/http.js');
Page({
  data: {
    textareaAValue: "",
    switchdata: "",
    nickName:""
  },
  back() {
    wx.redirectTo({
      url: '',
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  switchff(e) {
    this.setData({
      switchdata: e.detail.value
    })
  },

  onGotUserInfo: function (e) {
    this.setData({
      nickName:e.detail.userInfo.nickName
    })
    let params = {
      content: this.data.textareaAValue,
      type: this.data.switchdata,
      name: this.data.nickName,
    }
    // console.log(params)
    http.post({
      url: config.service.save_yjfk,
      data: params
    }, (res) => {
      if (res.data.errcode == 0) {
        wx.redirectTo({
          url: '../index',
        })
      }
    })
  },
  
})