// pages/payment/unpaid/unpaid.js
var userId = wx.getStorageSync('userId')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.request({
      url:getApp().globalData.serverUrl + 'my_order',
      method:'POST',
      data:{
        user_id:userId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        let unpaidorders =  res.data.data
        self.setData({
          unpaidorders:unpaidorders
        })








        console.log(res)
      }

    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var pages = getCurrentPages()
    // var prevPage = pages[pages.length - 2]
    // console.log(prevPage)
    // var unpaidgoods = prevPage.data.goods
    // var extra = prevPage.data.extra
    // var total = prevPage.data.total
    // this.setData({
    //   unpaidgoods:unpaidgoods,
    //   extra:extra,
    //   total:total
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  pay(e){
    var self = this
    let orderid = e.currentTarget.dataset.orderid
    wx.request({
      url:getApp().globalData.serverUrl + 'order_pay',
      method:'POST',
      data:{
        order_id:orderid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){


        console.log(res)
      }

    })
  },
  cancel(e){
    var self = this
    let orderid = e.currentTarget.dataset.orderid
    let index = e.currentTarget.dataset.index
    wx.request({
      url:getApp().globalData.serverUrl + 'dell_order',
      method:'POST',
      data:{
        order_id:orderid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        let array = self.data.unpaidorders
        array.splice(index,1)
        self.setData({
          unpaidorders:array
        })

        console.log(res)
      }

    })
  }
})