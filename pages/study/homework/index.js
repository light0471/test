// pages/study/homework/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ""
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
  upLoad: function(e) {
    console.log("hahaha")
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  showimg: function(e) {
    wx.previewImage({
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572956671092&di=e56a292bcfbcbdc52e3b625f76c1a877&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fexp%2Fw%3D500%2Fsign%3Dbd4ea902aacc7cd9fa2d34d909032104%2F8cb1cb1349540923ccb5d1919b58d109b2de4904.jpg'],
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  upLoadFile: function(e) {

  },
  downLoad1: function() {
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