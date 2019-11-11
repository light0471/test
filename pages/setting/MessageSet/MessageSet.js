const app = getApp()
var util = require('../../utils/util.js');
var t = util.formatTime(new Date());
var config = require('../../utils/config.js');
var http = require('../../utils/http.js');
Page({
  data: {
    textareaAValue: ""
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue:e.detail.value
    })
  },
  switchff(e) {
    this.setData({
      switchdata: e.detail.value
    })
  },

  confirm: function (e) {
    
    let params = {
      title: this.data.textareaAValue,
      time:t
      
    }
  
  console.log(params)
    http.post({
      url: config.service.save_gg,
      data: params
    }, (res) => {
      if (res.data.errcode == 0) {
        wx.navigateBack()
      }
    })
  },

})