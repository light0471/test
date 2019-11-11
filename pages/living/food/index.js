var util = require('../../utils/util.js');
Page({
  data: {
    
  },

  onLoad: function(e) {
    // 获取当天时间
    var that = this;
    var time = util.formatTime(new Date()).substring(11, 13);
    console.log(time)
    time = parseInt(time)

    if (0 < time && time< 9) {
      this.setData({
        selected1: false,
        selected2: false,
        selected: true
      })
    } else if (9 <= time && time <= 12) {
      this.setData({
        selected: false,
        selected2: false,
        selected1: true
      })
    } else {
      this.setData({
        selected: false,
        selected1: false,
        selected2: true
      })
    }
  },

  selected: function(e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },

  selected1: function(e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },

  selected2: function(e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
})