const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
      title: '出行',
      img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
      url: '/cx/index'
      },
      {
        title: '娱乐',
        img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
        url: '/yl/index'
      },{
        title: '餐饮',
        img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
        url: '/indexes/indexes'
      },
      {
        title: '请假',
        img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
        url: '/verticalnav/verticalnav'
      }
    ]
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages/living' + e.currentTarget.dataset.url
      })
    },
  }
});