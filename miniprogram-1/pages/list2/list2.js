// pages/list2/list2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    info: "hello world list 2",
    imgSrc: "/images/1.jpg",
    randomNum: Math.random() * 10,
    randomNum1: Math.random().toFixed(2),
    count: 0,
    msg: "你好",
    type: 1,
    flag: true,
    arr1: ['apple', 'huawei', 'xiaomi'],
    userList:[
      {id:1,name:'aa'},
      {id:2,name:'bb'},
      {id:3,name:'cc'}
    ],
  },
  btnTap(e) {
    console.log(e);
  },
  changeFlag() {
    console.log(this.data.flag);
    this.setData({
      flag: !this.data.flag
    })
  },

  // +1按钮
  btnTapAdd(e) {
    // this.setData 为 data赋新值
    this.setData({
      count: this.data.count + 1
    })
  },
  // +2按钮
  btnTapAdd2(e) {
    // console.log(e.target.dataset.info);
    this.setData({
      count: this.data.count + e.target.dataset.info
    })
  },

  // 输入框的事件处理函数
  inputHandler(e) {
    // console.log(e);
    this.setData({
      msg: e.detail.value
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