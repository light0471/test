// camera.js
let AppID = '17672756'
let AppKey = 'tZqMy63iDQx7KshPBEz6eQlN'
let AppSecret = 'pMaxzfXmVcGc8erCSXo6hlQogu066QCG'


Page({
  data: {
    base64: "",
    token: "",
    msg: null,
    windowWidth: ''
  },
  onLoad: function (options) {
    let _this = this
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowWidth : res.windowWidth
        })
      }
    })
  },
  upload_sb () {
    //acess_token获取
    console.log('222222222222222222')
    var that = this;
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: AppKey,
        client_secret: AppSecret
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log('--==', res)
        that.setData({
          token: res.data.access_token//获取到token
        })

        //上传人脸进行 比对
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.token,
          method: 'POST',
          data: {
            image: that.data.base64,
            image_type: 'BASE64',
            group_id_list: 'group_study'
          },
          header: {
            'Content-Type': 'application/json' // 默认值
          },
          success(res) {
            that.setData({
              msg: res.data.result.user_list[0].score
            })
            if (that.data.msg > 80) {
              wx.showToast({
                title: '验证通过',
                icon: 'success',
                duration: 1000, 
                success: function() {
                  //验证通过，跳转至UI页面
                  wx.navigateTo({
                    url: '/pages/index/index',
                  })
                }
              })
            }
          }
        });
      }
    })
  },
  //拍照并编码
  takePhoto() {
    //拍照
    var that = this;
    const ctx = wx.createCameraContext()

    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('1111111111111111111')
        this.setData({
          src: res.tempImagePath
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res1 => { //成功的回调
            that.setData({
              base64: res1.data
            })
            that.upload_sb()
          }
        })
      }
    })

    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    })
  },
  error(e) {
    console.log(e.detail)
  }
})