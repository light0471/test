// pages/study/ja/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgloc: '',
    id: ''
  },

  downLoad: function () {
    wx.saveFile({
      success: function (res) {
        var savedFilePath = res.savedFilePath
        console.log(savedFilePath)
      },
      fail: function () {
        console.log(111)
      },
    })
  },

  downLoad1: function () {
    let that = this;
    wx.downloadFile({
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572588745131&di=719765ab1a7880460a33802cdc0a5e63&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Fwap720%2F6afa72aely1fspk35ervuj21bj0qojuw.jpg',
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          that.setData({
            imgloc: res.tempFilePath
          })
          console.log(res.tempFilePath)
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath
          })
          wx.showToast({
            "title": "下载成功！"
          })
        }
      }
    })
  }
})