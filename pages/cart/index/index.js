// pages/cart/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    hasList: false,
    totalPrice: 0,
    selectAllStatus: true,
    redDotUrl: '../../../images/redDot.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let url = getApp().globalData.serverUrl
    // let self = this
    // wx.request({
    //   url: url + 'cart',
    //   methods: 'POST',
    //   data: {
    //     user_id: 26
    //   },
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     if (res.data.data.length === 0) {
    //       wx.redirectTo({
    //         url: '../emptycart/emptycart'
    //       })
    //     }
    //   }
    // })
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
    let url = getApp().globalData.serverUrl
    let self = this
    wx.request({
      url: url + 'cart',
      method: "POST",
      data: {
        user_id: 26
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res)
        if (res.data.data.length === 0) {
          wx.redirectTo({
            url: '../emptycart/emptycart'
          })
        }
        // let carts = res.data.data
        let result = res.data.data
        result.map((ele) => {
          ele.selected = true
          ele.freight = parseInt(ele.freight)
          ele.shop_price = parseInt(ele.shop_price)
          ele.goods_num = parseInt(ele.goods_num)
        })
        self.setData({
          carts: result
        })
        self.checkN()
        self.getTotalPrice()
      }
    })
    // this.setData({
    //   hasList: true,
    //   carts: [{
    //       id: 123,
    //       title: '手撕面包',
    //       image: '../../../images/breed.png',
    //       num: 1,
    //       price: 1.23,
    //       selected: true,
    //       info: '1.23元/斤'
    //     },
    //     {
    //       id: 235,
    //       title: '精品零食',
    //       image: '../../../images/snack.png',
    //       num: 1,
    //       price: 2.35,
    //       selected: true,
    //       info: '2.35元/斤'
    //     }
    //   ],
    //   n: 2
    // })
    // this.getTotalPrice()
    // this.checkN()

    // var flag = app.globalData.isCartEmpty
    // if (flag) {    //   wx.navigateTo({
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

  getTotalPrice() {
    let carts = this.data.carts;
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].goods_num * carts[i].shop_price
      }
    }
    this.setData({
      carts: carts,
      totalPrice: total.toFixed(2)
    })
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index
    let carts = this.data.carts
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    })
    this.checkN()
    this.checkAllSelectStatus()
    this.getTotalPrice()
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    })
    this.checkN()
    this.getTotalPrice();
  },
  addCount(e) {
    // console.log(1)
    const index = e.currentTarget.dataset.index
    let carts = this.data.carts;
    let num = carts[index].goods_num
    num = num + 1;
    carts[index].goods_num = num;
    this.checkN()
    this.setData({
      carts: carts
    })
    this.getTotalPrice();
  },
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].goods_num;
    if (num <= 1) {
      return false
    }
    num = num - 1;
    carts[index].goods_num = num;
    this.checkN()
    // n === 0 ? n = 1 : null
    this.setData({
      carts: carts
    });
    this.getTotalPrice()
  },
  deleteList(e) {
    var self = this
    wx.showModal({
      title: '',
      content: '确定要删除该商品吗?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.serverUrl + 'cart',
            method: "POST",
            data: {
              user_id: 26,
              id: e.currentTarget.dataset.cartindex
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              const index = e.currentTarget.dataset.index;
              let carts = self.data.carts
              carts.splice(index, 1);
              self.checkN()
              self.getTotalPrice()
              console.log(carts)
              if (carts.length === 0) {
                wx.redirectTo({
                  url: '../emptycart/emptycart'
                })
              }
              self.setData({
                carts: carts
              });
              if (!carts.length) {
                self.setData({
                  hasList: false
                })
              } else {
                self.getTotalPrice()
              }
              // let result = res.data.data
              // result.map((ele) => {
              //   ele.selected = true
              //   ele.freight = parseInt(ele.freight)
              //   ele.shop_price = parseInt(ele.shop_price)
              //   ele.goods_num = parseInt(ele.goods_num)
              // })
              // self.setData({
              //   carts: result
              // })
              // self.checkN()
              // self.getTotalPrice()
            }
          })

        } else {
          // do nothing
        }
      }

    })

  },
  clearCarts() {
    let url = getApp().globalData.serverUrl
    var self = this
    wx.showModal({
      title: '',
      content: '确定要清空购物车吗?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: url + 'del_cart',
            method: 'POST',
            data: {
              user_id: 26,
              id: ''
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function () {
              // self.setData({
              //   carts: {},
              //   hasList: false
              // })
              wx.redirectTo({
                url: '../emptycart/emptycart'
              })
            }
          })
        } else {
          // do nothing
        }
      }
    })
  },
  continue () {
    wx.switchTab({
      url: '../../index/index',
    })
  },
  checkAllSelectStatus() {
    // this.data.carts.map((ele)=>{
    //    if(!ele.selected){
    //     this.setData({selectAllStatus:false})
    //     return
    //    }
    // })
    // this.data.carts.map((ele)=>{
    //   if(!){

    //   }
    // })
    let res = this.data.carts.filter((ele) => {
      return ele.selected === false
    })
    res.length === 0 ? this.setData({
      selectAllStatus: true
    }) : this.setData({
      selectAllStatus: false
    })
  },
  checkN() {
    let n = 0
    let res = this.data.carts.filter((ele) => {
      return ele.selected === true
    })
    res.forEach(ele => {
      n += ele.goods_num
    });
    this.setData({
      n: n
    })
  }
})