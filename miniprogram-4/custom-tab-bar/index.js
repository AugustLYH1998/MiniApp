// custom-tab-bar/index.js

import {
  storeBindingsBehavior
} from "mobx-miniprogram-bindings";
import {
  store
} from "../store/store";


Component({
  behaviors: [storeBindingsBehavior],
  options: {
    styleIsolation: 'shared',
  },

  storeBindings: {
    store,
    fields: {
      sum: "Sum",
      active: "active"
    },
    actions: {
      updateActive: "updateActive"
    },
  },

  observers: {
    'sum': function (val) {
      this.setData({
        'list[1].info': val
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

    "list": [{
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home-active.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息",
        "iconPath": "/images/message.png",
        "selectedIconPath": "/images/message-active.png",
        "info": 0
      },
      {
        "pagePath": "/pages/contact/contact",
        "text": "我的",
        "iconPath": "/images/contact.png",
        "selectedIconPath": "/images/contact-active.png"
      }
    ]

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // this.setData({
      //   active: event.detail
      // });
      this.updateActive(event.detail);
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})