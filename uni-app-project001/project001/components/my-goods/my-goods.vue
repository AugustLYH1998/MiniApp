<template>
  <view class="list">
    <!-- 商品图片区 -->
    <view class="left">
      <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品信息区 -->
    <view class="right">
      <view class="goods-name">
        {{item.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">
          ￥{{item.goods_price | tofix}}
        </view>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      }
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
    }
  }
</script>

<style lang="scss">
  .list {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .right {
      display: flex;
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
    }
  }
</style>
