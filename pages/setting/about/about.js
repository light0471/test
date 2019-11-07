const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        ColorList: app.globalData.ColorList,
        display: ''
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
        });
    },

    showView: function () {
        this.setData({
            display: "block"
        })
    },

    hideView: function () {
        this.setData({
            display: "none"
        })
    },

    showSlx: function () {
        wx.showToast({
            "title": "VX:thanks214！"
        })
    }
});
