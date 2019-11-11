// pages/study/signin/index.js

var config = require('../../utils/config.js');
var http = require('../../utils/http.js');
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    mystatus: {}, // 状态    0:未打卡 1:打卡  
    my_status: [],
    circle_show: true,
    message_m: "",
    message_a: "",
    lists: []
  },

  onLoad: function (e) {
    this.getList()
  },

  //点击日期显示签到情况
  selectDate: function (e) {
    const date = e.detail.date;
    let i = date.substr(8, 2) - 1
    let res_m = this.data.mystatus['m_' + i]
    let res_a = this.data.mystatus['a_' + i]
    let statustext_m = "";
    let statustext_a = "";
    let time_m = ''
    let time_a = ''

    if (typeof (res_m) == 'undefined' || res_m == null) {
      statustext_m = ""
    } else {
      time_m = res_m.time
      if (res_m.status) {
        statustext_m = "签到成功"
      } else {
        statustext_m = "您已迟到"
      }
    }

    if (typeof (res_a) == 'undefined' || res_a == null) {
      statustext_a = ""
    } else {
      time_a = res_a.time
      if (res_a.status) {
        statustext_a = "签到成功"
      } else {
        statustext_a = "您已迟到"
      }
    }

    this.setData({
      message_m: time_m + ' ' + statustext_m,
      message_a: time_a + ' ' + statustext_a
    })
  },

  //从后台调取数据
  getList: function (e) {
    let that = this
    let params = {}
    http.post({
      url: config.service.list_qd,
      data: params
    }, (res) => {
      console.log(res)
      if (res.data.errcode == 0) {
        that.setData({
          lists: res.data.items
        })
        that.getCount()
        that.getStatus()
      }

    })
  },

  //定义并判断签到状态
  getStatus: function () {
    let mystatus = {};
    let arr = this.data.lists;
    let my_c = {}

    for (let i = 0; i < arr.length; i++) {
      let j = (arr[i].time).substr(8, 2) - 1
      my_c[j + ''] = j
      let date = (arr[i].time).substr(0, 10)
      let ma = ''

      //判断时间段
      if ((arr[i].time >= (date + ' ' + "00:00:00")) && (arr[i].time <= (date + ' ' + "12:00:00"))) {
        ma = 'm_'
      } else {
        ma = 'a_'
      }
      let key = ma + j

      //判断签到状态
      if ((arr[i].time <= (date + ' ' + "09:30:00")) && (arr[i].time > (date + ' ' + "06:00:00")) || (arr[i].time <= (date + ' ' + "14:30:00")) && (arr[i].time > (date + ' ' + "12:00:00"))) {
        mystatus[key] = {
          time: arr[i].time,
          status: true
        }
      } else {
        mystatus[key] = {
          time: arr[i].time,
          status: false
        }
      }
    }
    this.setData({
      mystatus: mystatus
    })

    let my = this.data.my_status
    console.log('this.data.mystatus', this.data.mystatus)

    /*
    结合两个时间段的签到，定义一个总的状态值，
    上下午签到成功，状态为1，
    只有一个签到或者有一个签到迟到，状态为0，
    没签到，状态为null
    */
    for (var key in my_c) {
      let j = my_c[key]
      let res_m = this.data.mystatus['m_' + j]
      let res_a = this.data.mystatus['a_' + j]

      if ((typeof (res_m) == 'undefined' || res_m == null) && (typeof (res_a) == 'undefined' || res_a == null)) {
        my[j] = null
      } else {
        if (res_m && res_a && res_m.status && res_a.status) {
          my[j] = 1
        } else {
          my[j] = 0
        }
      }

    }
    this.setData({
      my_status: my
    })
    console.log(mystatus)
  },


  getCount: function () {
    let date = new Date();
    let i = date.getDate()
    console.log(i)
    let my = []
    for (let j = 0; j < parseInt(i); j++) {
      my.push(null)
    }
    this.setData({
      my_status: my
    })
  }
})