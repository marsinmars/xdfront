<template>
  <detail-header :videoInfo="videoInfo"/>
  <detail-course :videoInfo="videoInfo"/>
  <detail-tab :videoInfo="videoInfo" :chapterList="chapterList"/>
  <footer>
    <router-link :to="{path: '/pay',query: {video_id:this.$route.query.video_id}}">
      <button>立刻购买</button>
    </router-link>
  </footer>
</template>

<script>
import DetailTab from "@/views/CourseDetail/Components/Tab";
import DetailCourse from "@/views/CourseDetail/Components/Course";
import DetailHeader from "@/views/CourseDetail/Components/Header";
import {getVideoDetail} from "@/api/getData";
import {onMounted, reactive, toRefs} from "vue";
import {useRoute} from "vue-router/dist/vue-router";

export default {
  name: "CourseDetail",
  components: {DetailTab, DetailCourse, DetailHeader},
  setup() {
    let data = reactive({
      videoInfo: {},
      chapterList: [],
    })

    //get video detail
    async function getDetail(vid) {
      try {
        let rst = await getVideoDetail(vid);
        if (rst.data.code == 0) {
          data.videoInfo = rst.data.data;
          data.chapterList = rst.data.data.chapter_list;
        }
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getDetail(useRoute().query.video_id)
    })

    return {...toRefs(data)}
  }
}
</script>

<style lang="scss" scoped>
//底部
footer {
  // fixed固定在底部
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 0;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.05);
}
//设置购买按钮样式
button {
  display: block;
  color: #fff;
  margin: 0 auto;
  background-color: #d93f30;
  height: 34px;
  line-height: 34px;
  border-radius: 17px;
  width: 80%;
  border: none;
  font-size: 15px;
  text-align: center;
}
</style>