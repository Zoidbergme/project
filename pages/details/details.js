// pages/details/details.js
var userId = getApp().globalData.userId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicatorColor: "rgba(255,255,255,0.9)",
    indicatorActiveColor: '#c92607',
    // imgUrls: [
    //   'https://i.loli.net/2018/05/11/5af4fd3f60632.jpg',
    //   'https://i.loli.net/2018/05/11/5af4fd3f60f8f.jpg',
    //   'https://i.loli.net/2018/05/11/5af4fd3f61a92.jpg'
    // ],
    title: '立即购买',
    buyPanel: false,
    cartNum:0,
    num:1


  },
  close(){
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
    this.setData({
      buyPanel:false,
      title:'立即购买'
    })
  },
  addToCart(){
    let cartNum = this.data.cart_num
    let url = getApp().globalData.serverUrl
    let id = this.data.id
    wx.request({
      url: url + 'add_cart',
      method: 'POST',
      data: {
        user_id: userId,
        goods_id: id,
        number:1
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        if(res.data.code !== 200){
           wx.showModal({
             title:"操作失败",
             content:res.data.message,
             showCancel:false,
             confirmText:'重试'

           })
           res.data.message
        }else{
          wx.switchTab({
            url:'../cart/index/index'
          })
        }
      }
    })
  },
  change() {
    // this.setData({
    //   title: '下一步',
    //   buyPanel: true
    // })
    if(this.data.title === '下一步'){
      wx.navigateTo({
        url:'../payment/createpayment/createpayment'
      })
    }
    this.setData({
      title: '下一步',
      buyPanel: true
    })
  },
  minus(){
    let number = this.data.num
    number = number < 2 ? 1 : number - 1
    this.setData({
      num:number
    })
  },
  add(){
    let number = this.data.num
    number += 1
    this.setData({
      num:number
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = getApp().globalData.serverUrl
    let id = parseInt(options.id, 10)
    this.setData({
      id:id
    })
    let self = this
    wx.request({
      url: url + 'goods_info',
      method: 'POST',
      data: {
        user_id: userId,
        goods_id: id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res)
        let imgs = res.data.data["goods_img"]
        let goodInfos = res.data.data["info_img"]
        let goodname = res.data.data["goods_name"]
        let goodprice = res.data.data["shop_price"]
        let extra = res.data.data.freight
        let cartNum = res.data.data["cart_num"]
        let profile = goodInfos[0]
        self.setData({
          imgUrls:imgs,
          goodInfos:goodInfos,
          goodname:goodname,
          goodprice:goodprice,
          extra:extra,
          cartNum:cartNum,
          profile:profile

        })
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