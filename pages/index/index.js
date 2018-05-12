//index.js
//获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })

var app = getApp()
Page({
  data:{
    indicatorDots:true,
    vertical:false,
    autoplay:true,
    interval:3000,
    duration:1000,
    indicatorColor:"rgba(255,255,255,0.9)",
    indicatorActiveColor:"#c92607",
    // images:[
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
    // goods:[
    //   { pic:'https://i.loli.net/2018/05/07/5af01db74bda0.jpg',id:'123'},
    //   { pic:'https://i.loli.net/2018/05/07/5af01db75624a.jpg',id:'456'},
    //   { pic:'https://i.loli.net/2018/05/07/5af01db7574fe.jpg',id:'789'}
    // ]
  },
  swiperchange:function(e){

  },
  onLoad:function(){
    this.dialog = this.selectComponent("#dialog")
    var that = this
    var logined = wx.getStorageSync('logined')
    if(logined === 'true'){
      this.dialog.hideDialog()
    }
    // wx.getUserInfo({
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    // wx.getUserInfo(function(userInfo){
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    let url = getApp().globalData.serverUrl
    wx.request({
      url:url + 'index',
      method:'POST',
      data:{},
      success:function(res){
        // console.log(res)
        let sliderImg = res.data.data.ad.map((ele)=>{
          return ele["ad_code"]
        })
        // let goodImg = res.data.data.goods.map((ele)=>{
        //   return ele["original_img"]
        // })
        let goodImg = res.data.data.goods
        // console.log(res.data.data.ad)
        that.setData({
          images:sliderImg,
          goods:goodImg
        })
      }

    })
  },
  onReady:function(){
    // this.dialog = this.selectComponent("#dialog")
  },
  _cancelEvent(){
    // console.log('cancel');
    this.dialog.hideDialog()

  },
  _confirmEvent(e){
    // console.log('confirm');
    this.dialog.hideDialog()
    // try{
    //   wx.setStorageSync('userInfo',e.detail.userInfo)
    // }catch(e){

    // }
    // console.log(e)
    // getApp().globalData.userInfo = e.detail.userInfo
    // wx.request({

    // })
  }


})