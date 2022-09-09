<template>
  <h1 style="color: #666666; text-align: center; margin-top: 50px"> Your Course</h1>
  <div class="list" v-if="orders.length>0">
    <div class="box" v-for="item in orders" :key="item.id">
      <router-link :to="{path:'coursedetail',query:{video_id:item.video_id}}">
        <div class="smallbox">
          <div class="imgdiv">
            <img :src="item.video_img" alt="corse img"/>
          </div>
          <div class="textdiv">
            <p>{{ item.video_title }}</p>
            <p>$&nbsp;&nbsp;{{ (item.total_fee / 100).toFixed(2) }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div class="no_order" v-else>
    <p>暂未购买课程 </p>
  </div>


  <common-footer></common-footer>
</template>

<script>
import CommonFooter from "@/components/CommonFooter";
import {onMounted, reactive, toRefs} from "vue";
import store from "@/store";
import {getOrderList} from "@/api/getData";

export default {
  name: "Order",
  components: {CommonFooter},
  setup() {
    let values = reactive({
      orders: [],
    })

    async function getOList() {
      try {
        let result = await getOrderList(store.state.token)
        if (result.data.code == 0) {
          values.orders = result.data.data;
        }
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getOList();
    })
    return {...toRefs(values)}
  }
}
</script>

<style lang="scss" scoped>

.list {
  padding: 0 20px;
}

// 视频个体
.box {
  padding: 20px 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  // 标题
  .title {
    font-size: 14px;
    margin-bottom: 15px;
  }

  // 订单详情
  .smallbox {
    //flex左右排列，两端对齐
    display: flex;
    justify-content: space-between;

    .imgdiv {
      width: 90px;
      height: 60px;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .textdiv {
      width:275px;

      p{
        width:100%;
        color: #666666;
        padding-left: 10px;
      }
    }
  }
}

.no_order {
  margin-top: 50px;
  text-align: center;
}
</style>