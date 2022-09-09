<template>
    <div class="header">
      <span><van-icon @click="$router.back(-1)" name="arrow-left" /></span>
      <span class="title">{{videoInfo.title}}</span>
    </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    videoInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;//flex左右布局
  background-color: #07111b;
  padding: 10px 20px;
  color: #fff;
}
// 返回箭头

//视频标题
.title {
  font-size: 16px;
  width: 80%;
  //超出省略
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>