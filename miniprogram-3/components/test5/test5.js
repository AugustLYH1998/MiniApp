// components/test5/test5.js
const mybehaviors = require('../../behaviors/my-behaviors')


Component({
  behaviors: [mybehaviors],
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    username: "lishi"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add() {
      this.setData({
        count: this.properties.count + 1
      })

      // 触发自定义事件  将数值同步给父组件 传递到e的detial
      this.triggerEvent('sync', {
        value: this.properties.count
      });

    }
  }
})