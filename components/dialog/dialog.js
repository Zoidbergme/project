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
    // agreeGetUser: function (e) {
    //   console.log(e)
    //   try {
    //     wx.setStorageSync('userInfo', e.detail.userInfo)
    //   } catch (e) {

    //   }
    //   getApp().globalData.userInfo = e.detail.userInfo
    //   wx.login({
    //     success: function (res) {
    //       // console.log('@!##$$#^%%$$^&%%$%&^%$%$^%##%@!@#$$^%%^^$')
    //       // console.log(res)
    //       if (res.code) {
    //         wx.request({
    //           url: getApp().globalData.serverUrl + 'get_openid',
    //           data: {
    //             code: res.code
    //           },
    //           header: {
    //             "content-type": "application/x-www-form-urlencoded"
    //           },
    //           method: 'POST',
    //           success: function (result) {
    //             // console.log('-------------------------------')
    //             // console.log(result)
    //             getApp().globalData.openId = result.data.data
    //             wx.request({
    //               url: getApp().globalData.serverUrl + 'login',
    //               data: {
    //                 account:result.data.data,
    //                 name:getApp().globalData.userInfo.nickName,
    //                 head_pic:getApp().globalData.userInfo.avatarUrl
    //               },
    //               header: {
    //                 "content-type": "application/x-www-form-urlencoded"
    //               },
    //               method: 'POST',
    //               success:function(res){
    //                 // console.log("-----------------------------------------")
    //                 // console.log(res)
    //                 wx.setStorageSync('userId',res.data.data.user_id)
    //                 getApp().globalData.userId = res.data.data.user_id
    //                 wx.setStorageSync('logined','true')
    //               }

    //             })
    //           }
    //         })
    //       }
    //     }
    //   })

















    // },
    agreeGetUser: function (e) {
      console.log(e)
      var openid = wx.getStorageSync('openid')
      try {
        wx.setStorageSync('userInfo', e.detail.userInfo)
      } catch (e) {

      }
      getApp().globalData.userInfo = e.detail.userInfo

      wx.request({
        url: getApp().globalData.serverUrl + 'login',
        data: {
          account:openid,
          name:getApp().globalData.userInfo.nickName,
          head_pic:getApp().globalData.userInfo.avatarUrl
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success:function(res){
          // console.log("-----------------------------------------")
          // console.log(res)
          wx.setStorageSync('userId',res.data.data.user_id)
          getApp().globalData.userId = res.data.data.user_id
          wx.setStorageSync('logined','true')
        }

      })

      // wx.login({
      //   success: function (res) {
      //     // console.log('@!##$$#^%%$$^&%%$%&^%$%$^%##%@!@#$$^%%^^$')
      //     // console.log(res)
      //     if (res.code) {
      //       wx.request({
      //         url: getApp().globalData.serverUrl + 'get_openid',
      //         data: {
      //           code: res.code
      //         },
      //         header: {
      //           "content-type": "application/x-www-form-urlencoded"
      //         },
      //         method: 'POST',
      //         success: function (result) {
      //           // console.log('-------------------------------')
      //           // console.log(result)
      //           getApp().globalData.openId = result.data.data
      //           wx.request({
      //             url: getApp().globalData.serverUrl + 'login',
      //             data: {
      //               account:result.data.data,
      //               name:getApp().globalData.userInfo.nickName,
      //               head_pic:getApp().globalData.userInfo.avatarUrl
      //             },
      //             header: {
      //               "content-type": "application/x-www-form-urlencoded"
      //             },
      //             method: 'POST',
      //             success:function(res){
      //               // console.log("-----------------------------------------")
      //               // console.log(res)
      //               wx.setStorageSync('userId',res.data.data.user_id)
      //               getApp().globalData.userId = res.data.data.user_id
      //               wx.setStorageSync('logined','true')
      //             }

      //           })
      //         }
      //       })
      //     }
      //   }
      // })

















    },
    _cancelEvent() {
      this.triggerEvent('cancelEvent')
    },
    _confirmEvent() {
      this.triggerEvent('confirmEvent')
    }
  }
})