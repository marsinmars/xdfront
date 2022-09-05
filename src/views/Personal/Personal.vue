<template>
  <div class="container">
    <img class="image" :src="info.head_img || defaultHeadImg" alt="头像"/>
    <router-link to="/login" v-if="getToken===''">
      <h3>Login</h3>
    </router-link>
    <p v-else>{{ info.name }}</p>
  </div>
  <button v-if="getToken!==''" class="green" @click="signOut">Log out</button>
  <common-footer></common-footer>
</template>

<script>
import CommonFooter from "@/components/CommonFooter";
import {computed, onMounted, reactive, toRefs} from "vue";
import defaultHeadImg from "@/assets/logo.png"
import {getUserInfo} from "@/api/getData";
import store from "@/store";

export default {
  name: "Personal",
  components: {CommonFooter},
  setup() {
    let values = reactive({
      info: {},
      defaultHeadImg: defaultHeadImg,
      getToken: computed(() => {
        return store.state.token
      })
    });

    async function getInfo() {
      try {
        let result = await getUserInfo(values.getToken);
        if (result.data.code == 0) {
          values.info = result.data.data;
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function signOut() {
      //清除token
      await store.dispatch('clearToken')
      localStorage.removeItem("token")
      //刷新页面
      location.reload()
    }

    onMounted(() => {
      if (values.getToken) {
        getInfo();
      }
    })
    return {...toRefs(values), getInfo, signOut}
  }

}
</script>

<style lang="scss" scoped>
.container {
  // 顶部头像区域
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: #2c3f54;




  .image {
    width: 60px;
    height: 60px;
    border-radius: 50px;
  }

  p {
    font-size: 16px;
    color: #ffffff;
    margin-top: 10px;
  }

}

// 退出登录
.green {
  display: block;
  background-color: #3bb149;
  border: none;
  outline: none;
  width: 80%;
  height: 40px;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 20px;
}
</style>