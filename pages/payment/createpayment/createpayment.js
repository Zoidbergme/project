// pages/payment/tobepaid/tobepaid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      name:'我也替你们捉急',
      phone:'123456789',
      address:'成都市天府新区天府五街'
    },
    goods:[{
      image:'../../../images/breed.png',
      title:'精品手撕面包',
      info:'2.35元/斤',
      price:2.35,
      extra:10,
      num:1
    },
    {
      image:'../../../images/snack.png',
      title:'精品零食',
      info:'1.23元/斤',
      price:1.23,
      extra:10,
      num:1
    }]
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
  
  }
})