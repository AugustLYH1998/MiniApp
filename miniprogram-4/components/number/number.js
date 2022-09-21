// components/number/number.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings';

import {
  store
} from '../../store/store';

Component({

  behaviors: [storeBindingsBehavior],
  storeBindings: {

    // 数据源
    store,
    fields: {
      numA: 'numA',
      numB: 'numB',
      Sum: 'Sum'
    },
    actions: {
      updateNum2: 'updateNum2'
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnHandler(e) {
      this.updateNum2(e.target.dataset.step)
    }
  }
})