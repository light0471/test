// pages/study/homework/index.js
var config = require('../../utils/config.js');
var http = require('../../utils/http.js');
Page({
  data: { 
    lists:[],
   
  },

  SetShadow(e) {
    this.setData({
      shadow: e.detail.value
    })
  },

  SetBorderSize(e) {
    this.setData({
      bordersize: e.detail.value
    })
  },

  onLoad: function (e) {
    this.getList()
  },

  //后台获取数据
  getList: function (e) {
    let that = this
    let params = {}
    http.post({
      url: config.service.list_zy,
      data: params
    }, (res) => {
      console.log(res)
      if (res.data.errcode == 0) {
        that.setData({
          lists: res.data.items
        })
      }

    })
  },

  //点击出现弹框
  upLoad: function(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  //查看附件图片
  showImg: function(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  
  //取消
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  //下载
  downLoad: function() {
    wx.chooseImage({
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success(res) {
            const savedFilePath = res.savedFilePath
          }
        })
      }
    })
  }
})