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
    let result=reactive({
      banners:[],
      videoList:[],
    })

    async function getBannerData(){
      result.banners=(await getBanner()).data.data
    }

    async function getVList(){
      result.videoList=(await getVideoList()).data.data
    }

    onMounted(()=>{
      getBannerData(),getVList()
    })

    return {...toRefs(result)}
  }
  // setup() {
  //
  //   let banners = reactive([])
  //   let videoList = reactive([])
  //
  //
  //   async function getBannerData() {
  //     try {
  //       let result = await getBanner();
  //       if (result.data.code == 0) {
  //         banners.push(result.data.data)
  //         console.log(banners)
  //       }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   };
  //
  //   async function getVList() {
  //     try {
  //       let result = await getVideoList();
  //       if (result.data.code == 0) {
  //         videoList.push(result.data.data);
  //       }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   };
  //   onMounted(()=>{
  //     getBannerData(),getVList()
  //   })
  //   return {banners, videoList}
  //
  // },
}
</script>

<style scoped>

</style>