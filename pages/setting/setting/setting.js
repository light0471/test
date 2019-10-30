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

        fontSize:16

    },

    magnifyFontSize(){

        this.setData({

            fontSize:this.data.fontSize+2

        })

    },

    shrinkFontSize(){

        this.setData({

            fontSize:this.data.fontSize-2

        })

    }

})