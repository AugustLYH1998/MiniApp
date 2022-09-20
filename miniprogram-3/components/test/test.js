// components/test/test.js
Component({

  options: {
    styleIsolation: 'isolated'
  },

  // 数据监听器
  observers: {

  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 第一种方式 无法指定默认值
    // max:Number

    // 方式二
    max: {
      type: Number,
      value: 10
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

    count: 0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 事件处理函数
    addCount() {
      if (this.data.count < this.properties.max)
        this.setData({
          count: this.data.count + 1,
          // max: this.data.max + 1
          max: this.properties.max + 1
        })

      this._showCount();
    },

    // 自定义方法
    _showCount() {
      wx.showToast({
        title: 'count的值是' + this.data.count,
        icon: 'none'
      })
    },

    showInfo() {
      console.log(this.data);
      console.log(this.properties);
      console.log(this.properties === this.data);
    }
  }
})