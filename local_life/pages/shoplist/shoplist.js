// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: [],
    shoplist: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isLoading: false,
    toButton: false
  },

  getShoplist() {

    this.setData({
      isLoading: true
    })

    // 添加loading 效果
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'get',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        // console.log(res);
        const {
          data
        } = res;
        this.setData({
          shoplist: [...this.data.shoplist, ...data],
          total: res.header['X-Total-Count'] - 0,
        })
      },
      complete: () => {
        // 隐藏loading效果
        wx.hideLoading({
          success: (res) => {},
        });
        this.setData({
          isLoading: false
        })


      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      query: options
    })

    // console.log(this.data.query);

    this.getShoplist();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      page: 1,
      shoplist: [],
      total: 0
    });
    this.getShoplist();

    // 关闭下拉刷新
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 节流阀
    if (this.data.isLoading) return;

    if (this.data.shoplist.length < this.data.total) {
      this.setData({
        page: this.data.page + 1
      })
      this.getShoplist();
    } else {
      this.setData({
        toButton: true
      });
      // 提示数据加载完毕
      return wx.showToast({
        title: '数据加载完毕！',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})