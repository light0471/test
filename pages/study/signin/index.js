// pages/study/signin/index.js
var config = require('../../utils/config.js');
var http = require('../../utils/http.js');
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    mystatus1: {}, // 状态    0:未打卡 1:打卡  
    mystatus: [1,1,1,0,null],
    my_status: [],
    circle_show: true,
    message1: "",
    message2: "",
    lists: []
  },
  onLoad: function(e) {
    //发起状态请求，在请求成功后，定义mystatus
    // this.aa()
    // this.kk()
    
    this.getList()
  },

  selectDate: function(e) {

    const date = e.detail.date;
    var i = date.substr(9, 2) - 1

    let res1 = this.data.mystatus1['m_' + i]
    let res2 = this.data.mystatus1['a_' + i]
    var statustext1 = "";
    var statustext2 = "";
    var time1 = ''
    var time2 = ''
    // if (res1.status && res2.status){
    //   e.detail.status=1
    // }else{
    //   e.detail.status = 0
    // }
    if (typeof(res1) == 'undefined' || res1 == null) {
      statustext1 = ""
    } else {
      time1 = res1.time
      if (res1.status) {
        statustext1 = "签到成功"
      } else {
        statustext1 = "您已迟到"
      }
    }


    if (typeof(res2) == 'undefined' || res2 == null) {
      statustext2 = ""
    } else {
      time2 = res2.time
      if (res2.status) {
        statustext2 = "签到成功"
      } else {
        statustext2 = "您已迟到"
      }
    }

    this.setData({
      message1: time1 + ' ' + statustext1,
      message2: time2 + ' ' + statustext2
    })
  },
  getList: function(e) {
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
        that.aa()
        that.kk()
      }

    })
  },
  kk: function() {
    var mystatus1 = {};
    var mystatus = [];
    var arr = this.data.lists;
    let my_c = {}
    for (var i = 0; i < arr.length; i++) {
      //遍历输出
      var j = (arr[i].time).substr(9, 2) - 1
      my_c[j + ''] = j
      var date = (arr[i].time).substr(0, 10)
      let ma = ''
      if ((arr[i].time >= (date + ' ' + "00:00:00")) && (arr[i].time <= (date + ' ' + "12:00:00"))) {
        ma = 'm_'
      } else {
        ma = 'a_'
      }
      let key = ma + j
      if ((arr[i].time <= (date + ' ' + "08:30:00")) && (arr[i].time > (date + ' ' + "06:00:00")) || (arr[i].time <= (date + ' ' + "14:00:00")) && (arr[i].time > (date + ' ' + "12:00:00"))) {
        mystatus1[key] = {
          time: arr[i].time,
          status: true
        }
      } else {
        mystatus1[key] = {
          time: arr[i].time,
          status: false
        }
      }
    }
    this.setData({
      mystatus1: mystatus1
    })
    let my = this.data.my_status
    console.log('this.data.mystatus1', this.data.mystatus1)
    for (var key in my_c) {
      
      let j = my_c[key]
      let res1 = this.data.mystatus1['m_' + j]
      let res2 = this.data.mystatus1['a_' + j]

      if ((typeof (res1) == 'undefined' || res1 == null) && (typeof (res2) == 'undefined' || res2 == null)){
        my[j] = null
      } else {
        if (res1 && res2 && res1.status && res2.status){
          my[j] = 1
        }else{
          my[j] = 0
        }
      }
      
    }
    this.setData({
      my_status: my
    })
    console.log(mystatus1)
  },
  aa:function(){
    let date = new Date();
    var i = date.getDate()
    let my = []
    for (var j = 0; j < parseInt(i); j++) {
      my.push(null)
    }
    this.setData({
      my_status: my
    })
  }
})