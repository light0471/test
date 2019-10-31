const app = getApp();
// Page({
// //   data: {
// //     StatusBar: app.globalData.StatusBar,
// //     CustomBar: app.globalData.CustomBar,
// //     ColorList: app.globalData.ColorList,
// //   },
// //   onLoad: function () { },
// //   pageBack() {
// //     wx.navigateBack({
// //       delta: 1
// //     });
// //   }
// // });
Page({

    data:{
        ScreenBrightness: '',

        fontSize:20

    },

    // magnifyFontSize(){
    //
    //     this.setData({
    //
    //         fontSize:this.data.fontSize+3
    //
    //     })
    //
    // },
    //
    // shrinkFontSize(){
    //
    //     this.setData({
    //
    //         fontSize:this.data.fontSize-3
    //
    //     })
    //
    // },
    changeFontSize:function(e){
        // var that= this;

        this.setData({

            fontSize:parseInt(e.detail.value).toFixed()

        })
    // wx.CanvasContext.font({value:parseInt(e.detail.value).toFixed(1)})
},
    //监听页面加载
    changeScreenLight:function(e){
        var that = this;
        //滑动拉杆获得值
        wx.setScreenBrightness({
            value: parseFloat(e.detail.value).toFixed(1)
        })
        //给屏幕亮度赋值
        wx.getScreenBrightness({
            success: function(res) {
                that.setData({
                    ScreenBrightness: res.value
                })
            }
        })
    }


})