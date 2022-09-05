<template>
  <div>
    <!--视频信息-->
    <div class="info">
      <p class="info_title">商品信息</p>
      <div class="box">
        <div class="imgDiv">
          <img alt="课程照片" :src="videoInfo.cover_img"/>
        </div>
        <div class="textDiv">
          <p class="c_title">{{ videoInfo.title }}</p>
          <p class="price">￥:&nbsp;&nbsp; {{ (videoInfo.price / 100).toFixed(2) }}</p>
        </div>
      </div>
    </div>
    <!--顶部支付-->
    <div class="footer">
      <p class="money">实付:&nbsp;&nbsp; {{ (videoInfo.price / 100).toFixed(2) }}</p>
      <p class="submit" @click="pay">立刻支付</p>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, reactive, toRefs} from "vue";
import {getVideoDetail, saveOrder} from "@/api/getData";
import store from "@/store";
import {Toast} from 'vant';
import {useRoute, useRouter} from "vue-router";
import 'vant/es/toast/style';



export default {
  name: "Pay",
  setup() {
    let data = reactive({
      videoInfo: {},
      vid: computed(() => {
        return useRoute().query.video_id
      }),
      router: useRouter()
    })

    async function getDetail(vid) {
      try {
        let result = await getVideoDetail(vid)
        if (result.data.code == 0) {
          data.videoInfo = result.data.data;
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function pay() {
      try {
        let result = await saveOrder(store.state.token, data.vid)
        if (result.data.code == 0) {
          Toast.success({
            message: '购买成功',
            duration: 2000,
            onClose: () => {
              data.router.push({path: "/order"})
            }
          })
        } else {
          Toast.fail({
            message: "下单失败",
            duration: 1500,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getDetail(data.vid)
    })
    return {...toRefs(data), pay}
  }
}
</script>

<style lang="scss" scoped>
// 视频标题
.info_title {
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #d9dde1;
}

.box {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  margin-bottom: 15px;

  .imgDiv {
    width: 105px;
    height: 59px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .textDiv {
    margin-left: 20px;
    height: 59px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .price {
      flex-shrink: 0;
    }
  }
}

//底部
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
  font-size: 16px;

  .money {
    height: 50px;
    line-height: 50px;
    flex: 2;
    text-align: center;
    background-color: #fff;
  }

  .submit {
    height: 50px;
    line-height: 50px;
    flex: 1;
    text-align: center;
    background-color: #ff2d50;
    color: #fff;
  }
}
</style>