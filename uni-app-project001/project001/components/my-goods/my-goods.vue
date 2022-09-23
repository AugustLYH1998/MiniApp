<template>
  <view class="list">
    <!-- 商品图片区 -->
    <view class="left">
      <!-- 使用 v-if 指令控制 radio 组件的显示与隐藏 -->
      <!-- 存储在购物车中的商品，包含 goods_state 属性，表示商品的勾选状态 -->
      <!-- @绑定自定义事件，在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
      <radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品信息区 -->
    <view class="right">
      <view class="goods-name">
        {{item.goods_name}}
      </view>
      <view class="goods-info-box">
        <!-- 商品费用 -->
        <view class="goods-price">
          ￥{{item.goods_price | tofix}}
        </view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      item: {
        type: Object,
        default: {}
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNum: {
        type: Boolean,
        default: false,
      },
    },
    name: "my-goods",
    filters: {
      tofix(num) {
        return Number(num).toFixed(2);
      }
    },
    data() {
      return {
        // 默认图片地址
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      // radio 组件的点击事件处理函数
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          goods_id: this.item.goods_id,
          goods_state: !this.item.goods_state
        })
      },
      // 监听change事件
      numChangeHandler(val) {
        // console.log(val);
        // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
        this.$emit('num-change', {
          // 商品的 Id
          goods_id: this.item.goods_id,
          // 商品的最新数量 +号保证其为数值
          goods_count: +val
        })
      }
    }

  }
</script>

<style lang="scss">
  .list {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    // 让 list 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;

    .left {
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        .goods-price {
          font-size: 16px;
          color: #C00000;
        }
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
