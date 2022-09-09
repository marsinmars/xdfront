<template>
  <van-tabs v-model:active="activeName">
    <van-tab title="简介" name="summary"><Summary :videoInfo="videoInfo"/></van-tab>
    <van-tab title="目录" name="catalog"><Catalog :chapterList="chapterList"/></van-tab>
  </van-tabs>
<!--  <component :videoInfo="videoInfo" :videoList="videoList" :is='activeName==="summary"?"Summary":"Catalog" '/>-->
</template>

<script>
import Summary from "@/views/CourseDetail/Components/Summary";
import Catalog from "@/views/CourseDetail/Components/Catalog";
import {ref} from "vue";

export default {
  name: "Tab",
  props: {
    videoInfo: {
      type: Object,
      required: true
    },
    chapterList: {
      type: Array,
      required: true
    }
  },
  components: {Summary, Catalog},
  setup() {
    let activeName = ref('');
    return {activeName}
  }
}
</script>

<style scoped>

</style>