// 创建store的实例对象

import {
  observable,
  action
} from 'mobx-miniprogram'

export const store = observable({

  numA: 1,
  numB: 2,
  active: 0,

  // 计算属性
  get Sum() {
    return this.numA + this.numB;
  },

  // 定义action方法
  updateNum1: action(function (step) {
    if (step > 0) {
      this.numA += step;
    } else {
      if (this.numA > 0) {
        this.numA += step;
      }
    }
  }),
  updateNum2: action(function (step) {
    if (step > 0) {
      this.numB += step;
    } else {
      if (this.numB > 0) {
        this.numB += step;
      }
    }

  }),

  updateActive: action(
    function (index) {
      this.active = index;
    }
  )

});