<template>
  <view class="my-search-contatiner" :style=" {'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{ 'border-radius':radius +'px'}">
      <uni-icons type="search" size="30"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {

      };
    },
    methods:{
      
      // 自定义事件
      searchBoxHandler(){
        // console.log('~~~');
        this.$emit('myclick')
      }
    }



  }
</script>

<style lang="scss">
  .my-search-contatiner {
    height: 50px;
    // background-color: #C00000;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .my-search-box {
      height: 36px;
      background-color: white;
      // border-radius: 18px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }

    }
  }
</style>
