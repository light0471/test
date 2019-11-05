var app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        ColorList: app.globalData.ColorList,
        ScreenBrightness: '',
        fontSize: 20,
        SkinStyle: "normal"
    },
    onLoad: function () {
        var that = this;
        wx.getStorage({
            key: 'skins',
            success: function (res) {
                that.setData({
                    SkinStyle: res.data
                })
            },
        })
    },
    pageBack() {
        wx.navigateBack({
            delta: 1
        })
    },
    changeFontSize: function (e) {
        this.setData({
            fontSize: parseInt(e.detail.value).toFixed()
        })
    },

    changeScreenLight: function (e) {
        var that = this;
        //滑动拉杆获得值
        wx.setScreenBrightness({
            value: parseFloat(e.detail.value).toFixed(1)
        })
        //给屏幕亮度赋值
        wx.getScreenBrightness({
            success: function (res) {
                that.setData({
                    ScreenBrightness: res.value
                })
            }
        })
    },
    bgBtn: function () {
        if (this.data.SkinStyle === "normal") {
            app.globalData.skin = "dark"; //设置app（）中皮肤的类型
            this.setData({
                SkinStyle: app.globalData.skin //设置SkinStyle的值
            })
            wx.setStorage({   //设置storage
                key: 'skins',
                data: app.globalData.skin,
            })
        } else {
            app.globalData.skin = "normal";
            this.setData({
                SkinStyle: "normal"
            })
            wx.setStorage({
                key: 'skins',
                data: app.globalData.skin,
            })
        }
    }
})