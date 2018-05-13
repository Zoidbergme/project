// pages/address/selectAdress/selectAddress.js
var url = getApp().globalData.serverUrl
var userId = wx.getStorageSync('userId')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // addressList: [{
    //   name: 'Fry',
    //   phone: '18254564554',
    //   address: '北京东直门东方银座'
    // }, {
    //   name: 'Zoidberg',
    //   phone: '18545486464',
    //   address: '成都市菁蓉镇'
    // }]
    addressList:[]
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
    var self = this
    wx.request({
      url: url + 'address',
      method: 'POST',
      data: {
        user_id: userId,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        console.log(res)
        self.setData({
          addressList: res.data.data
        })
        // console.log(res)
        // if(res.data.data.length === 0){
        //   wx.redirectTo({
        //     url:'../addAddress/addAddress'
        //   })
        // }
      }
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

  toAdd() {
    wx.navigateTo({
      url: '../fillOut/fillOut'
    })
  },
  delete(e) {
    var self = this
    wx.showModal({
      title: '',
      content: '确定要删除该地址吗',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.serverUrl + "operation_address",
            method: 'POST',
            data: {
              type: 2,
              user_id: userId,
              address_id: e.currentTarget.dataset.addressid
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              const index = e.currentTarget.dataset.index;
              let addressList = self.data.addressList
              addressList.splice(index, 1)
              self.setData({
                addressList:addressList
              })

            }
          })
        }
      }
    })
    // wx.showModal({
    //     title: '',
    //     content: '确认要删除此地址吗？',
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.request({
    //             url: getApp().globalData.serverUrl + 'operation_address',
    //             method: "POST",
    //             data: {
    //               type:2,
    //               user_id: userId,
    //               address_id: e.currentTarget.dataset.cartindex
    //             },
    //             header: {
    //               "content-type": "application/x-www-form-urlencoded"
    //             },
    //             success:function(){

    //             }
    //           }
    //         }
    //       }
    // }
  },
  selectAddress(e){
    const idx = e.currentTarget.dataset.index
    let addressList = this.data.addressList
    addressList[idx].selected = true
    addressList.map((ele,index)=>{
      if(index !== idx){
        ele.selected = false
      }
    })
    var addressInfo = {
      address_id:addressList[idx].address_id,
      consignee:addressList[idx].consignee,
      address:addressList[idx].province + addressList[idx].city + addressList[idx].district + addressList[idx].address,
      mobile:addressList[idx].mobile
    }
    wx.setStorageSync('addressInfo',addressInfo)
    this.setData({
      addressList:addressList

    })
    // wx.navigateBack({
    //   delta:1
    // })
    wx.redirectTo({
      url:'../../payment/createpayment/createpayment'
    })
  }














})