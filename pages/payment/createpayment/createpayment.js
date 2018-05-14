// pages/payment/tobepaid/tobepaid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      // name:'我也替你们捉急',
      // phone:'123456789',
      // address:'成都市天府新区天府五街'
    },
    // goods:[{
    //   image:'../../../images/breed.png',
    //   title:'精品手撕面包',
    //   info:'2.35元/斤',
    //   price:2.35,
    //   extra:10,
    //   num:1
    // },
    // {
    //   image:'../../../images/snack.png',
    //   title:'精品零食',
    //   info:'1.23元/斤',
    //   price:1.23,
    //   extra:10,
    //   num:1
    // }]
    good:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var addressInfo = wx.getStorageSync('addressInfo')
    var user = {}
    user.name = addressInfo.consignee
    user.phone = addressInfo.mobile
    user.address = addressInfo.address
    user.address_id = addressInfo.address_id
    this.setData({
      user:user
    })
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    var good = {}
    good.image = prevPage.data.goodInfos[0]
    good.title = prevPage.data.goodname
    good.price = prevPage.data.goodprice
    good.extra = prevPage.data.extra
    good.num = prevPage.data.num
    good.id = prevPage.data.id
    good.total = parseFloat(good.price) * parseInt(good.num) + parseFloat(good.extra)
    this.setData({
      good:good
    })  
  
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
  goSelect(){
    wx.navigateTo({
      url:'../../address/selectAdress/selectAddress'
    })
  },
  pay(){
    // wx.navigateBack({
    //   delta:1
    // })
    var self = this
    var userId = wx.getStorageSync('userId')
    console.log(userId)
    wx.request({
      url: getApp().globalData.serverUrl + 'add_order',
      method: 'POST',
      data: {
        user_id: userId,
        goods_id:self.data.good.id,
        goods_num: self.data.good.num,
        address_id:self.data.user.address_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log(res)
      }
    })
  }
  
})