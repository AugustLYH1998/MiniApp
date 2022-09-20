// components/test3/test3.js
Component({

  options: {
    pureDataPattern: /^_/
  },

  observers: {

    // 'rgb.r,rgb.g,rgb.b': function (newr, newg, newb) {
    //   this.setData({
    //     fullColor: `${newr},${newg},${newb}`
    //   })
    // }
    'rgb.**': function (object) {
      this.setData({
        fullColor: `${object.r},${object.g},${object.b}`
      })
    },

    '_rgb2.**': function (object) {
      this.setData({
        fullColor2: `${object.r},${object.g},${object.b}`
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
    rgb: {
      r: 0,
      g: 0,
      b: 0
    },
    fullColor: '0,0,0',

    _rgb2: {
      r: 0,
      g: 0,
      b: 0
    },
    fullColor2: '0,0,0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changR() {
      this.setData({
        'rgb.r': this.data.rgb.r + 5 > 255 ? 255 : this.data.rgb.r + 5
      })
    },
    changG() {
      this.setData({
        'rgb.g': this.data.rgb.g + 5 > 255 ? 255 : this.data.rgb.g + 5
      })
    },
    changB() {
      this.setData({
        'rgb.b': this.data.rgb.b + 5 > 255 ? 255 : this.data.rgb.b + 5
      })
    },

    // 纯数据字段
    changR2() {
      this.setData({
        '_rgb2.r': this.data._rgb2.r + 5 > 255 ? 255 : this.data._rgb2.r + 5
      })
    },
    changG2() {
      this.setData({
        '_rgb2.g': this.data._rgb2.g + 5 > 255 ? 255 : this.data._rgb2.g + 5
      })
    },
    changB2() {
      this.setData({
        '_rgb2.b': this.data._rgb2.b + 5 > 255 ? 255 : this.data._rgb2.b + 5
      })
    },
    _randomColor() {
      this.setData({
        _rgb2: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        }
      })
    }
  },

  // 生命周期
  attached() {
    console.log('attached');
  },
  created() {
    console.log('created');
  },
  lifetimes: {
    attached() {
      console.log('attached-----');
    },
    created() {
      console.log('created----');
    }
  },


  pageLifetimes: {
    show() {
      console.log('show');
      this._randomColor();
    },
    hide() {
      console.log('hide');
    },
    resize() {
      console.log('resize');
    }
  }
})