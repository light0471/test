var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var util = require('../../utils/util.js');
var t = util.formatTime(new Date());
var config = require('../../utils/config.js');
var http = require('../../utils/http.js');
var time1 = t.substr(11, 19);
const app = getApp()

Component({
  properties: {
    location: String,
  },
  lifetimes: {

    attached: function () {
      console.log('-----======')
      // 在组件实例进入页面节点树时执行
      console.log('attached')
      qqmapsdk = new QQMapWX({
        key: 'G64BZ-NTSCU-GJRVA-B5ZP3-HSAMQ-3KBER' //这里自己的key秘钥进行填充
      });
      this.getUserLocation()
      this.getNewsList()
    },

  },

  options: {
    addGlobalClass: true,
    location: location,
  },

  data: {

    imgUrls: [{
      link: '../news/news',
      url: 'https://n.sinaimg.cn/translate/67/w1000h667/20191104/32ee-ihuuxuu7922061.jpg',
    },
    {
      link: '../news/news',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572950914339&di=a3a3c11e2ce6d415ba8336ac3d5ce0c8&imgtype=0&src=http%3A%2F%2Fp2.pccoo.cn%2Fpost%2F20150405%2F2015040516392410962800.jpg',
    },
    {
      link: '../news/news',
      url: 'https://n.sinaimg.cn/translate/192/w1000h792/20191031/8731-ihqyuym7227964.jpg',
    },
    {
      link: '../news/news',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572951897946&di=feeb94f6bb2f255252a3df1744ed8db3&imgtype=0&src=http%3A%2F%2F06imgmini.eastday.com%2Fmobile%2F20190505%2F20190505210008_47c50c7b594643585a2d40bc6feffdd7_3_mwpl_05500201.jpg',
    },
    ],
    Hei: "350rpx" //这是swiper要动态设置的高度属性
  },

  methods: {
    getNewsList: function () {
      let dat_v = this.data.inforList
      let that = this
      let data_is = []
      let params = {}
      http.post({
        url: config.service.list_gg,
        data: params
      }, (res) => {
        if (res.data.errcode == 0) {
          for (let item of res.data.items) {
            data_is.push({
              title: item.title
            })
          }
          that.setData({
            inforList: data_is
          })
        }
        console.log(res.data.items)
      })
    },
    getUserLocation: function () {
      let vm = this;
      wx.getSetting({
        success: (res) => {
          // console.log(JSON.stringify(res))
          // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
          // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
          // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        //再次授权，调用wx.getLocation的API
                        vm.getLocation();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            //调用wx.getLocation的API
            vm.getLocation();
          } else {
            //调用wx.getLocation的API
            vm.getLocation();
          }
        }
      })
    },
    // 微信获得经纬度
    getLocation: function () {
      let vm = this;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          // console.log(JSON.stringify(res))
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy;
          vm.getLocal(latitude, longitude)
        },
        fail: function (res) {
          // console.log('fail' + JSON.stringify(res))
        }
      })
    },
    // 获取当前地理位置
    getLocal: function (latitude, longitude) {
      let vm = this;

      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          // console.log(JSON.stringify(res));
          let province = res.result.address_component.province
          let city = res.result.address_component.city
          vm.setData({
            province: province,
            location: city,
            latitude: latitude,
            longitude: longitude
          })
          console.log(vm.data.location)

          // app.globalData.city = vm.data.city
          // console.log(app.globalData.city)

        },
        fail: function (res) {
          // console.log(res);
        },
        complete: function (res) {
          // console.log(res);
        }
      });

    },

    gotonew: function () {
      wx.navigateTo({
        url: "../news/news",
      })
    },

    search: function () {
      wx.navigateTo({
        url: '../search/index'
      })
    },

    location: function () {
      wx.navigateTo({
        url: '../location/index'
      })
    },

    click: function () {
      var that = this;
      var show;
      var time = t;
      console.log(time);
      wx.scanCode({
        success: (res) => {
          this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path + "--time:" + time1;
          that.setData({
            show: this.show
          })
          if (res.result == "引擎计划移动开发培训班") {
            wx.showToast({
              title: time1,
              image: '/images/right.png',
              duration: 2000
            })
            http.post({
              url: config.service.save_qd,
              data: {
                time: time
              }
            },
              (res) => {
                if (res.data.errcode == 0) {
                  // 跳转
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
                console.log(res)
              })
          } else {
            wx.showToast({
              title: '签到失败',
              image: '/images/cancle.png',
              duration: 2000
            })
          }
        },


        fail: (res) => {
          wx.showToast({
            title: '签到失败',
            image: '/images/cancle.png',
            duration: 2000
          })
        },
        complete: (res) => { }
      })

      http.post({
        url: config.service.save_qd,
        data: {
          time: time
        }
      }, (res) => {
        if (res.data.errcode == 0) {
          // 跳转
          wx.redirectTo({
            url: '../index/index',
          })
        }
        console.log(res)
      })

    }
  }



})