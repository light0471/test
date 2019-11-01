// pages/study/homework/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  upLoad:function(e){
console.log("hahaha")
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  upLoadFile:function(e){

  },
  downLoad1: function () {
    wx.chooseImage({
      success: function (res) {
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