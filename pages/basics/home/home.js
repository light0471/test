var util = require('../../utils/util.js');
var t = util.formatTime(new Date());
var config = require('../../utils/config.js');
var http = require('../../utils/http.js');
var time1 = t.substr(11, 19);
Component({
  options: {
    addGlobalClass: true,
  },
  methods: {
    gotonew: function () {
      wx.navigateTo({
        url: "../../news/news",
      })
    },

    search: function () {
      wx.navigateTo({
        url: '../../search/index'
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
          wx.showToast({
            title: time1,
            image: '/images/right.png',
            duration: 2000
          })
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
            url: '../../index/index',
          })
        }
        console.log(res)
      })

    },

    onLoad(e) {
      console.log(e.title)
      this.setData({
        inforList: [{
          url: "../../news/news",
          title: "公告：游泳馆已换水，欢迎各位学员前来"
        },
        {
          url: "../../news/news",
          title: "公告：今天食堂菜谱已更新，点击查看"
        },
        {
          url: "../../news/news",
          title: "公告：请各位学员按时填写返程表"
        }
        ]
      });
    }
  },
  

  data: {
    imgUrls: [{
        link: '../../news/news',
        url: 'https://n.sinaimg.cn/translate/67/w1000h667/20191104/32ee-ihuuxuu7922061.jpg',
      },
      {
        link: '../../news/news',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572950914339&di=a3a3c11e2ce6d415ba8336ac3d5ce0c8&imgtype=0&src=http%3A%2F%2Fp2.pccoo.cn%2Fpost%2F20150405%2F2015040516392410962800.jpg',
      },
      {
        link: '../../news/news',
        url: 'https://n.sinaimg.cn/translate/192/w1000h792/20191031/8731-ihqyuym7227964.jpg',
      },
      {
        link: '../../news/news',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572951897946&di=feeb94f6bb2f255252a3df1744ed8db3&imgtype=0&src=http%3A%2F%2F06imgmini.eastday.com%2Fmobile%2F20190505%2F20190505210008_47c50c7b594643585a2d40bc6feffdd7_3_mwpl_05500201.jpg',
      },
    ],
  }
})