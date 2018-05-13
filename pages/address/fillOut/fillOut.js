// pages/address/fillOut/fillOut.js
var tcity = require("../../../utils/citys.js")
var url = getApp().globalData.serverUrl
var userId = wx.getStorageSync('userId')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phoneNumber:'',
    provinces:[],
    province:'',
    citys:[],
    city:'',
    countys:[],
    county:'选择区/县',
    value:[0,0,0],
    values:[0,0,0],
    condition:false
  },

  bindChange:function(e){
    var val = e.detail.value
    var t = this.data.values
    var cityData = this.data.cityData

    if(val[0] !== t[0]){
      const citys = []
      const contys = []

      for(let i = 0;i < cityData[val[0]].sub.length;i++){
        citys.push(cityData[val[0]].sub[i].name)
      }
      for(let i = 0;i < cityData[val[0]].sub[0].sub.length;i++){
        contys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys:citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],0,0]
      })
      return
    }

    if(val[1] != t[1]){
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],val[1],0]
      })
      return;
    }

    if(val[2] != t[2]){
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open:function(){
    this.setData({
      condition:!this.data.condition
    })
  },
  confirm:function(){
    var self = this
    wx.request({
      url: url + 'operation_address',
      method: 'POST',
      data: {
        type:1,
        user_id: userId,
        consignee:self.data.name,
        province:self.data.province,
        city:self.data.city,
        district:self.data.county,
        address:self.data.address,
        mobile:self.data.phoneNumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        wx.navigateBack({
          delta:1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    tcity.init(that)
    var cityData = that.data.cityData
    const provinces = []
    const citys = [];
    const countys = [];
    for(let i = 0; i < cityData.length;i++){
      provinces.push(cityData[i].name)
    }
    for(let i = 0;i < cityData[0].sub.length;i++){
      citys.push(cityData[0].sub[i].name)
    }
    for(let i = 0 ;i < cityData[0].sub[0].sub.length;i++){
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces':provinces,
      'province':cityData[0].name,
      'citys':citys,
      'city':cityData[0].sub[0].name,
      'countys':countys,
      // 'county':cityData[0].sub[0].sub[0].name
      'county':'选择区/县'
    })
    // for(let i = 0; i < cityData.length;i++){
    //   provinces.push(cityData[i].name)
    //   for(let j = 0;j < cityData[i];i++){

    //   }
    // }
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
  
  },

  setName(e){
    this.data.name = e.detail.value
  },
  setPhoneNumber(e){
    this.data.phoneNumber = e.detail.value
  },
  setAddress(e){
    this.data.address = e.detail.value
  }
})