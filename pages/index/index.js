//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isImage: false,
    imageSrc: '',
    array: ['永久', '一天', '十天', '一个月', '三个月', '一年'],
    pickerSelected: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      pickerSelected: this.data.array[0]
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function(e) {
    let expire = parseInt(e.detail.value.expire) || -1
    switch(expire) {
      case 0:
        expire = -1
        break
      case 1:
        expire = 1
        break
      case 2:
        expire = 10
        break
      case 3:
        expire = 30
        break
      case 4:
        expire = 90
        break
      case 5:
        expire = 365
        break
      default:
        expire = -1
    }
    const data = {
      text: encodeURIComponent(e.detail.value.content),
      scene: e.detail.value.scene,
      expire
    }
    if (!data.text) {
      return;
    }
    this.setData({
      isImage: true,
      imageSrc: `http://app.cdroom.top/wx/mz/qrCode/qr?expire=${data['expire']}&text=${data['text']}&scene=${data['scene']}`,
      pickerSelected: this.data.array[0]
    })
  },
  previewQRCode() {
    wx.previewImage({
      urls: [this.data.imageSrc]
    })
  },
  back2index() {
    this.setData({
      isImage: false
    })
  },
  selectExpire(e) {
    this.setData({
      pickerSelected: this.data.array[e.detail.value]
    })
  }
})
