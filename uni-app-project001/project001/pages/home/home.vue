<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-box">
      <my-search @myclick="gotoSearch"></my-search>
    </view>

    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(i,index) in navList" :key="index" @click="navClickHandler(i)">
        <image :src="i.image_src"></image>
      </view>
    </view>

    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(i,index) in floorList" :key="i">
        <image :src="i.floor_title.image_src" class="floor-title">
          <view class="box">
            <!-- 左侧大盒子 -->
            <navigator class="left" :url="i.product_list[0].url">
              <image :src="i.product_list[0].image_src" :style="{width: i.product_list[0].image_width+'rpx'}"
                mode="widthFix">
            </navigator>
            <!-- 右侧小盒子 -->
            <view class="right">
              <navigator class="right-img" v-for="(item2,i2) in i.product_list" :key="i2" v-if="i2!=0" :url="item2.url">
                <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
              </navigator>
            </view>
          </view>
      </view>
    </view>


  </view>

</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {
        // 获取轮播图的数据列表
        swiperList: [],
        // 获取分类导航的列表
        navList: [],
        // 获取楼层数据
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList();
      this.getNavList();
      this.getFloorList();
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata');
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = res.message;
        uni.$showMsg('轮播图数据请求成功')
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems');
        if (res.meta.status !== 200) return uni.$showMsg('导航数据请求失败');
        this.navList = res.message;
        uni.$showMsg('导航数据请求成功', 2000)

      },
      navClickHandler(i) {
        // console.log(i);
        if (i.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取楼层数据的定义方法
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata');
        if (res.meta.status !== 200) return uni.$showMsg('楼层数据获取失败');

        // 对数据进行处理
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
          })
        })
        this.floorList = res.message;
        uni.$showMsg('楼层数据获取成功', 3000);
      },
      // 访问搜索页
      gotoSearch() {
        uni.navigateTo({
          url: "/subpkg/search/search"
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;

    margin: 15px 0;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;

  }

  .box {
    display: flex;
  }

  .left {
    padding-left: 10rpx;
  }

  .right {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
