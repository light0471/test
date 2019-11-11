const app = getApp()
Page({
  onLoad: function (options) {

  }
})
Component({
  options: {
    addGlobalClass: true,
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
  showQrcode() {
    wx.previewImage({
      urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
      current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
    })
  },
})