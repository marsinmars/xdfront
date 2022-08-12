<template>
  <h1>Order</h1>
  {{list}}


  <common-footer></common-footer>
</template>

<script>
import CommonFooter from "@/components/CommonFooter";
import {reactive, toRefs} from "vue";
import {getBanner} from "@/api/getData";

export default {
  name: "Order",
  components: {CommonFooter},
  setup() {
    let data=reactive({
      list:[]
    })
    getBannerData()

    async function getBannerData() {
      data.list = (await getBanner()).data.data
    }
    return {...toRefs(data)}
  }
}
</script>

<style scoped>

</style>