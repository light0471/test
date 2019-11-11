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
      img: 'https://s2.ax1x.com/2019/11/07/MFranK.jpg',
      url: '/cx/index'
      },
      {
        title: '娱乐',
        img: 'https://s2.ax1x.com/2019/11/07/MFrAYj.jpg',
        url: '/yl/index'
      },{
        title: '餐饮',
        img: 'https://s2.ax1x.com/2019/11/07/MFrt6x.jpg',
        url: '/food/index'
      },
      {
        title: '请假',
        img: 'https://s2.ax1x.com/2019/11/07/MF4FW8.jpg',
        url: '/dayoff/pages/index/index'
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