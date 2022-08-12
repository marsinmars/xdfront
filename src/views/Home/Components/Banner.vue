<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="item in banners" :key="item">
      <img :src="item.img" style="width: 100%"/>
    </van-swipe-item>
  </van-swipe>

</template>

<script>
export default {
  name:"Banner",
  props:{
    banners:{
      type:Array,
      required:true
    }
  }
}

</script>

<style scoped>
</style>