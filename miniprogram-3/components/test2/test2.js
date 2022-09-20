// components/test2/test2.js
Component({

  // 监听器
  observers: {
    'n1,n2': function (new1, new2) {
      this.setData({
        sum: new1 + new2
      })
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

    n1: 0,
    n2: 0,
    sum: 0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount() {
      this.setData({
        n1: this.data.n1 + 1
      })
    },
    addCount2() {
      this.setData({
        n2: this.data.n2 + 1
      })
    },

  }
})