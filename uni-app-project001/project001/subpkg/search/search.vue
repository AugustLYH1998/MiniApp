<template>
  <view>

    <view class="search-box">
      <uni-search-bar @input="input" radius="100" cancelButton="none"></uni-search-bar>
    </view>


    <!-- 建议列表渲染 -->
    <view class="sugg-list" v-if="searchResult.length !==0">
      <view class="sugg-item" v-for="(item,index) in searchResult" :key="index" @click="gotoDetail(item)">
        <view class="goods_name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>


    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题 -->
      <view class="top-title">
        <text class="title-left">搜索历史</text>
        <uni-icons class="title-right" type="trash-filled" size="13" @click="clean"></uni-icons>
      </view>

      <!-- 搜索记录历史列表 -->
      <view class="button-list">
        <uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)">
        </uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]');
    },
    data() {
      return {

        // 延时器
        timer: null,
        kw: '',

        // 搜索的结果列表
        searchResult: [],

        // 搜索历史
        historyList: []

      };
    },
    methods: {
      // input输入事件
      input(e) {
        // 防抖处理
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // console.log(e.value);
          this.kw = e.value;
          this.getSearchResult(this.kw);
        }, 500)
      },
      // 查询搜索
      async getSearchResult(kw) {
        if (kw.length !== 0) {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/goods/qsearch?query=' + kw);
          if (res.meta.status !== 200) return uni.$showMsg("请求数据失败");
          this.searchResult = res.message;
        } else {
          this.searchResult = [];
          return;
        }
        this.savaHistory();
      },
      gotoDetail(item) {
        // console.log(item.goods_id);
        uni.navigateTo({
          url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,

        })
      },
      // 存入历史
      savaHistory() {
        // this.historyList.push(this.kw);

        const set = new Set(this.historyList);
        set.delete(this.kw)
        set.add(this.kw);

        this.historyList = Array.from(set);
        // 持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList));
      },
      // 删除历史记录
      clean() {
        this.historyList = [];
        uni.setStorageSync('kw', '[]');
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods_name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
      }
    }
  }


  .history-box {
    padding: 5px;
  }

  .top-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .button-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
</style>
