// pages/personal/index.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })


var app = getApp()
Page({
  data:{
    userInfo:{},
    userListInfo:[{
      icon:'../../images/location.png',
      text:'收货地址管理',
      nexturl:''
    },{
      icon:'../../images/bag.png',
      text:'待付款',
      nexturl:''
    }]

  },
  onLoad:function(){
    var self = this
    // wx.getUserInfo(function(userInfo){
    //     console.log(userInfo)
    //     self.setData({
    //       userInfo:userInfo
    //     })
    // })
    wx.getUserInfo({
      success:function(res){
        // console.log(res.userInfo)
        self.setData({
          userInfo:res.userInfo
        })
      }
    })
  }
})