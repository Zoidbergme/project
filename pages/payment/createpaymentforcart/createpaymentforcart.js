// pages/payment/tobepaid/tobepaid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
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
    goods: {}
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
      user: user
    })
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    // var foo       = prevPage.data
    // console.log(foo)
    // var bar = foo.goodToBuy
    var goods = prevPage.data.goodToBuy
    console.log(goods)
    var extra = goods[0].freight
    var total = goods.reduce(function (prev, cur) {
      return parseFloat(prev) + parseFloat(cur.shop_price) * parseFloat(cur.goods_num)
    }, 0)
    total += extra
    var ids = goods.map(function (ele) {
      return ele.id
    })
    ids = ids.join()
    console.log(ids)
    // console.log(parseFloat(0))
    // console.log(parseFloat(extra))
    // console.log(total)
    // console.log(goods)
    // var good = {}
    // good.image = prevPage.data.goodInfos[0]
    // good.title = prevPage.data.goodname
    // good.price = prevPage.data.goodprice
    // good.extra = prevPage.data.extra
    // good.num = prevPage.data.num
    // good.id = prevPage.data.id
    // good.total = parseFloat(good.price) * parseInt(good.num) + parseFloat(good.extra)
    this.setData({
      goods: goods,
      extra: extra,
      total: total,
      ids: ids
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
  goSelect() {
    wx.navigateTo({
      url: '../../address/selectAdress/selectAddress'
    })
  },
  pay() {
    // wx.navigateTo({
    //   url:'../unpaid/unpaid'
    // })
    var self = this
    var userId = wx.getStorageSync('userId')
    console.log(self)
    wx.request({
      url: getApp().globalData.serverUrl + 'cart_pay',
      method: 'POST',
      data: {
        cart_id: self.data.ids,
        user_id: userId,
        address_id: self.data.user.address_id
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