// pages/setting/grxx/index.js
const app = getApp()
Page({
  data: {
   
  },
    onLoad: function () {
        var that = this;
        wx.getStorage({
            key: 'skins',
            success: function (res) {
                that.setData({
                    SkinStyle: res.data
                })
            },
        })
    },
})