//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let self = this
    self.globalData.userId = wx.getStorageSync('userId')
    self.globalData.userInfo = wx.getStorageSync('userInfo')
    console.log(self.globalData)
    // wx.login({
    //   success:function(res){
    //     console.log('1')
    //     if(res.code){
    //       wx.request({
    //         url:self.globalData.serverUrl + 'get_openid',
    //         data:{
    //           code:res.code
    //         },
    //         header:{
    //             "content-type": "application/x-www-form-urlencoded"
    //         },
    //         method:'POST',
    //         success:function(res){
    //           console.log(res.data)
    //           // wx.openSetting({
    //           //   success:function(){
    //           //     console.log('work')
    //           //   },
    //           //   fail:function(){
    //           //     console.log('err')
    //           //   }
    //           // })
    //         }
    //       })
    //     }
    //   },
    //   fail:function(){
    //     console.log('err')
    //   }
    // })
  },

  //   // 登录
  //   wx.login({
  //     success: res => {
  //         if(res.code){
  //           // console.log(res)
  //           var self = this
  //           wx.request({
  //             url:self.globalData.serverUrl+'get_openid',
  //             data:{
  //               code:res.code
  //             },
  //             header: {
  //               "content-type": "application/x-www-form-urlencoded"
  //             },
  //             method:'POST',
  //             // dataType:'json',
  //             success:function(res){
  //               console.log(res.data)
  //               wx.openSetting({
  //                 success:(res) =>{
  //                   console.log(2)
  //                   if(!res.authSetting['scope.userInfo']){
  //                     wx.authorize({
  //                       scope:'scope.userInfo',
  //                       success(){
  //                         console.log(1)
  //                       }
  //                     })
  //                   }
  //                 },
  //               fail:function(res){
  //                 console.log('fool')
  //               })
  //               }

  //               // wx.getSetting({
  //               //   success: res => {
  //               //     console.log(res)
  //               //     wx.openSetting({
  //               //       success:(res) =>{

  //               //       }
  //               //     })
  //               //     if (res.authSetting['scope.userInfo']) {
  //               //     // console.log(2)
  //               //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //               //       wx.getUserInfo({
  //               //         success: res => {
  //               //           console.log(res)
  //               //           // 可以将 res 发送给后台解码出 unionId
  //               //           this.globalData.userInfo = res.userInfo
  //               //           console.log(this.globalData.userInfo)
            
  //               //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //               //           // 所以此处加入 callback 以防止这种情况
  //               //           if (this.userInfoReadyCallback) {
  //               //             this.userInfoReadyCallback(res)
  //               //           }
  //               //         }
  //               //       })
  //               //     }
  //               //   },
  //               //   fail:function(){
  //               //     console.log('err')
  //               //   }
  //               // })



  
  //             }
  //           })
  //         }else{
  //           console.log('登录失败!' + res.errMsg)
  //         }
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   // wx.getSetting({
  //   //   success: res => {
  //   //     // console.log(res)
  //   //     if (res.authSetting['scope.userInfo']) {
  //   //     // console.log(2)
  //   //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //   //       wx.getUserInfo({
  //   //         success: res => {
  //   //           console.log(res)
  //   //           // 可以将 res 发送给后台解码出 unionId
  //   //           this.globalData.userInfo = res.userInfo
  //   //           console.log(this.globalData.userInfo)

  //   //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //   //           // 所以此处加入 callback 以防止这种情况
  //   //           if (this.userInfoReadyCallback) {
  //   //             this.userInfoReadyCallback(res)
  //   //           }
  //   //         }
  //   //       })
  //   //     }
  //   //   }
  //   // })
  // },
  globalData: {
    userInfo: null,
    isCartEmpty:true,
    serverUrl:'http://192.168.0.147/tourism/index.php/user/'
  }
})