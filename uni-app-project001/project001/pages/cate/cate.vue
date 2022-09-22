<template>
  <view>
    <view class="scroll-view-contatiner">
      <!-- 左侧滑动区 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" class="left-scroll">

        <view :class="['left-scroll-view-item',index=== active ? 'active':'']" v-for="(item,index) in cateList"
          :key="index" @click="activeChange(index)">
          {{item.cat_name}}
        </view>

      </scroll-view>

      <!-- 右侧滑动区 -->
      <scroll-view scroll-y="true" :style="{height: wh+ 'px'}" :scroll-top="scrollTop">
        <view class="cate-level2" v-for="(item,index) in catLevel2" :key="index">
          <!-- 二级分类标题 -->
          <view class="cate-level2-title">
            /{{item.cat_name}}/
          </view>

          <!-- 三级分类 -->
          <view class="cat-level3-list">
            <view class="cat-level3-list-item" v-for="(item3,index3) in item.children" :key="index3" @click="gotoGoodslist(item3)">
              <image :src="item3.cat_icon" mode="widthFix"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>


        </view>
      </scroll-view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 当前设备可用高度
        wh: 0,
        cateList: [],
        active: 0,
        // 二级分类
        catLevel2: [],
        scrollTop: 0
      };
    },


    onLoad() {
      const sysInfo = uni.getSystemInfoSync();
      // console.log(sysInfo);
      this.wh = sysInfo.windowHeight;
      this.getCateList();
    },
    methods: {
      // 获取分类列表数据
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories');
        if (res.meta.status !== 200) return uni.$showMsg("获取分类列表失败");
        this.cateList = res.message;

        // 为二级分类赋值
        this.catLevel2 = res.message[0].children;
      },

      // 绑定点击index项
      activeChange(index) {
        this.active = index;
        // 重新为二级分类赋值
        this.catLevel2 = this.cateList[index].children;
        this.scrollTop = this.scrollTop === 0 ? 1 : 0;
      },
      
      // 跳转到商品列表页面
      gotoGoodslist(item3){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+ item3.cat_id
        })
      }

    }


  }
</script>

<style lang="scss">
  .scroll-view-contatiner {
    display: flex;

    .left-scroll {
      width: 120px;

      .left-scroll-view-item {
        background-color: #f7f7f7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: white;
          position: relative;

          &:before {
            content: '';
            display: block;
            width: 3px;
            height: 30px;
            background-color: red;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
          }
        }
      }
    }

    .cate-level2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }

    .cat-level3-list {
      display: flex;
      flex-wrap: wrap;

      .cat-level3-list-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;

        image {
          width: 50px;
        }

        text {
          font-size: 12px;
        }
      }
    }

  }
</style>
