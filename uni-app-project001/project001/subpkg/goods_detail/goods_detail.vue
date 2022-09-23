<template>
  <view v-if="goods_info.goods_name" class="goods-box">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区 -->
    <view class="goods-info">
      <!-- 商品价格 -->
      <view class="goods-info-price">
        ￥{{goods_info.goods_price}}
      </view>
      <!-- 商品信息主体区 -->
      <view class="goods-info-body">
        <!-- 商品名字 -->
        <view class="goods-name">
          {{goods_info.goods_name}}
        </view>
        <!-- 收藏按钮 -->
        <view class="goods-favior">
          <uni-icons type="star" size="15" color="gray"></uni-icons>
          <text>收藏</text>

        </view>
      </view>
      <!-- 运费 -->
      <view class="goods-info-yf">
        快递：免运费
      </view>

      <!-- 富文本内容 -->
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>


    </view>

    <!-- 商品导航按钮 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>

  </view>
</template>

<script>
  // 按需导入 mapMutations 这个辅助方法
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex';


  export default {
    computed: {
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
      // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
      // 今后无论映射 mutations 方法，还是 getters 属性，还是 state 中的数据，都需要指定模块的名称，才能进行映射
      ...mapState('m-cart', ['cart']),
      ...mapGetters('m-cart', ['total'])
    },
    watch: {
      // // 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
      // total(newVal) {
      //   // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
      //   const findResult = this.options.find((x) => x.text === '购物车')
      //   if (findResult) {
      //     // 3. 动态为购物车按钮的 info 属性赋值
      //     findResult.info = newVal
      //   }
      // }

      // 定义 total 侦听器，指向一个配置对象
      total: {
        // handler 属性用来定义侦听器的 function 处理函数
        handler(newVal) {
          const findResult = this.options.find(x => x.text === '购物车')
          if (findResult) {
            findResult.info = newVal
          }
        },
        immediate: true
      }


    },
    data() {
      return {
        goods_info: {},
        options: [{
          icon: 'shop',
          text: '店铺',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('m-cart', ['addToCart']),
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + goods_id);
        if (res.meta.status !== 200) return $uni.$showMsg();

        // 对详情图片进行空行处理 图片后缀处理
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
          .replace(/webp/g, 'jpg');

        this.goods_info = res.message;
      },
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      onClick(e) {
        console.log(e);
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // 右侧按钮的点击事件处理函数
      buttonClick(e) {
        // console.log(e);
        // console.log(this.goods_info);
        // 1. 判断是否点击了 加入购物车 按钮
        if (e.content.text === '加入购物车') {
          // 2. 组织一个商品的信息对象
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }
          // console.log(goods);
          // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
          this.addToCart(goods)
        }
      },
    },
    onLoad(options) {
      const goods_id = options.goods_id;
      this.getGoodsDetail(goods_id);
    }
  }
</script>

<style lang="scss">
  .goods-box {
    padding-bottom: 50px;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info {
    padding: 10px 10px;
  }

  .goods-info-price {
    font-size: 18px;
    color: #C00000;
    margin: 10px 0px;
  }

  .goods-info-body {
    display: flex
  }

  .goods-name {
    font-size: 13px;
    margin-right: 10px;
  }

  .goods-favior {
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    border-left: 1px solid #efefef;
    color: gray;
  }

  .goods-info-yf {
    font-size: 10px;
    color: gray;
    margin: 10px 0;
  }

  .goods_nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
