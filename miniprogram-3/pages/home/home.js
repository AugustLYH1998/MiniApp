// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0
  },
  add() {
    this.setData({
      count: this.data.count + 1
    })
  },

  syncCount(e) {
    // console.log('synCount');
    // console.log(e);
    this.setData({
      count: e.detail.value
    })
  },

  // 获取子组件实例
  getChild() {
    const child = this.selectComponent(".childA")
    // console.log(child);
    child.setData({
      count: child.properties.count + 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})