<template>
  <view>
    <view class="goods_list">
      <!-- 商品每一项 -->
      <view v-for="(item,index) in goodsList" :key="index" @click="gotoDeatil(item)">
        <my-goods :item="item" ></my-goods>
      </view>
    </view>

  </view>

</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        // 商品列表数据
        goodsList: [],
        // 总数量
        total: 0,
        // 节流阀
        isloading: false

      };
    },

    onLoad(options) {
      // console.log(options);
      // 定义请求参数
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // console.log(this.queryObj);

      // 请求商品列表数据
      this.getGoodsList();
    },
    methods: {
      async getGoodsList(cb) {
        this.isloading = true;
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search?query=' + this.queryObj.query + '&cid=' + this.queryObj
          .cid +
          '&pagenum=' + this.queryObj.pagenum + '&pagesize=' + this.queryObj.pagesize);
        // 关闭节流阀
        this.isloading = false;
        // 只要数据请求完毕 立即调用cb回调函数
        cb && cb();
        if (res.meta.status !== 200) return uni.$showMsg();
        this.goodsList = [...this.goodsList, ...res.message.goods];
        this.total = res.message.total;
      },

      // 跳转商品详情页
      gotoDeatil(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }

    },
    // 触底让页面+1
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
        return uni.$showMsg('数据加载完毕');
      }


      if (this.isloading) return;
      this.queryObj.pagenum++;
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1;
      this.total = 0;
      this.isloading = false;
      this.goodsList = [];

      this.getGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    }

  }
</script>

<style lang="scss">

</style>
