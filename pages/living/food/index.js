Page({
data:{

},

  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },

  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },

  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
})