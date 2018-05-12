Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    content: {
      type: String,
      value: '弹窗内容'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    confirmText: {
      type: String,
      value: '确定'
    }
  },
  data: {
    isShow: true
  },
  methods: {
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    agreeGetUser: function (e) {
      console.log(e)
      try {
        wx.setStorageSync('userInfo', e.detail.userInfo)
      } catch (e) {

      }
      getApp().globalData.userInfo = e.detail.userInfo
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: getApp().globalData.serverUrl + 'get_openid',
              data: {
                code: res.code
              },
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              success: function (result) {
                // console.log(res)
                getApp().globalData.openId = result.data.data
                wx.request({
                  url: getApp().globalData.serverUrl + 'login',
                  data: {
                    account:result.data.data,
                    name:getApp().globalData.userInfo.nickName,
                    head_pic:getApp().globalData.userInfo.avatarUrl
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  method: 'POST',
                  success:function(res){
                    wx.setStorageSync('logined','true')
                  }

                })
              }
            })
          }
        }
      })

















    },
    _cancelEvent() {
      this.triggerEvent('cancelEvent')
    },
    _confirmEvent() {
      this.triggerEvent('confirmEvent')
    }
  }
})