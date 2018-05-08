// pages/cart/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    hasList:false,
    totalPrice:0,
    selectAllStatus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var flag = app.globalData.isCartEmpty
    // this.setData()
    // if(flag){
    //   wx.navigateTo({
    //     url: '../emptycart/emptycart',
    //   })
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
    this.setData({
      hasList:true,
      carts:[
        {id:123,title:'手撕面包',image:'../../../images/breed.png',num:1,price:1.23,selected:true,info:'1.23元/斤'},
        {id:235,title:'精品零食',image:'../../../images/snack.png',num:1,price:2.35,selected:true,info:'2.35元/斤'}
      ]
    })
    // var flag = app.globalData.isCartEmpty
    // if (flag) {
    //   wx.navigateTo({
    //     url: '../emptycart/emptycart',
    //   })
    // }
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

  getTotalPrice(){
    let carts  = this.data.carts;
    let total = 0;
    for(let i = 0; i < carts.length; i++){
      if(carts[i].selected){
        total += carts[i].num * carts[i].price
      }
    }
    this.setData({
      carts:carts,
      totalPrice:total.toFixed(2)
    })
  },
  selectList(e){
    const index = e.currentTarget.dataset.index
    let carts = this.data.carts
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts:carts
    })
    this.getTotalPrice()
  },
  selectAll(e){
    let selectAllStatus = this.data.selectAllStatus;
    selectedAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0 ;i < carts.length;i++){
      carts[i].selected = selectAllStatus
    }
    this.setData({
      selectAllStatus:selectAllStatus,
      carts:carts
    })
    this.getTotalPrice();
  },
  addCount(e){
    const index = e.currentTarget.dataset.index
    let carts = this.data.carts;
    let num = carts[index].num
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts:carts
    })
    this.getTotalPrice();
  },
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts:carts
    });
    this.getTotalPrice()
  },
  deleteList(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts
    carts.splice(index,1);
    this.setData({
      carts:carts
    });
    if(!carts.length){
      this.setData({
        hasList:false
      })
    }else{
      this.getTotalPrice()
    }
  }
})