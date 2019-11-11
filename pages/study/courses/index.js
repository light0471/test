Page({
  data: {
    currentnav: 0,
    TabCur: 0,
    scrollLeft: 0,
    courses1: [{
      spot: '0',
      coursename: "小程序",
      coursedetail: ["8月21日  小程序起航", "8月22日  小程序结构", "8月23日  事件处理", "8月24日  页面布局", "8月25日  试图组件", "8月26日  页面导航", "8月27日  文件管理", "8月28日  网络通信", "8月29日  定位", "8月30日  AI"]
    },
    {
      spot: '1',
      coursename: "IOS",
      coursedetail: ["8月1日  Object-c简介", "8月1日  类与对象", "8月2日  函数", "8月3日  继承", "8月4日  多态", "8月5日  字符串", "8月6日  集合", "8月7日  按钮", "8月8日  图像", "8月9日  原型设计", "8月10日  应用发布", "8月11日  设计模式"]
    },
    {
      spot: '2',
      coursename: "JAVA",
      coursedetail: ["6月1日  JAVA简介", "6月2日  数据类型", "6月3日  类与对象", "6月4日  函数", "6月5日  继承与多态", "6月6日  SWING", "6月7日  框架", "6月8日  Spring", "6月9日  Mybatis", "6月10日  Hibernate", "6月11日  SpringMVC"]
    },
    {
      spot: '3',
      coursename: "安卓",
      coursedetail: ["6月12日  开发环境搭建", "6月13日  页面布局", "6月14日  Android控件", "6月15日  activity", "6月16日  数据持久化", "6月17日  服务", "6月18日  广播", "6月19日  网络通信", "6月20日  单元测试"]
    }
    ],
    courses: ["小程序", "IOS", "JAVA", "安卓"],

  },

  aaa() {
    wx.showToast({
      "title": "好好学习！"
    })
  },


  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
    console.log(e.currentTarget.dataset.id)
  },

  findloc:function(){
//     wx.openLocation({
//       latitude: 112.6977238303612,
//       longitude: 38.499446374259435,
//       scale: 15
//     })
// }

    wx.getLocation({
      success: function(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude: 38.499446374259435,
          longitude: 112.6977238303612,
          scale: 18
        })
        // wx.openLocation({
        //   latitude,
        //   longitude
        // })
        // console.log(latitude, longitude)
      },
    })
  }
})