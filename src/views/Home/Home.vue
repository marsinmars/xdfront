<template>
  <banner :banners="banners"></banner>
  <video-list :videoList="videoList"></video-list>
  <common-footer></common-footer>
</template>

<script>
import Banner from "@/views/Home/Components/Banner";
import VideoList from "@/views/Home/Components/VideoList";
import CommonFooter from "@/components/CommonFooter";
import {getBanner, getVideoList} from "@/api/getData";
import {onMounted, reactive, toRefs} from "vue";

export default {
  name: "Home",
  components: {Banner, VideoList, CommonFooter},
  setup(){
    let rst=reactive({
      banners:[],
      videoList:[],
    })

    async function getBannerData(){
      try {
        let result = await getBanner()
        if (result.data.code == 0) {
          rst.banners = result.data.data
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getVList(){
      try {
        let result = await getVideoList();
        if (result.data.code == 0) {
          rst.videoList = result.data.data;
        }
      } catch (e) {
        console.log(e)
      }

    }

    onMounted(()=>{
      getBannerData(),getVList()
    })

    return {...toRefs(rst)}
  }
}
</script>

<style scoped>

</style>