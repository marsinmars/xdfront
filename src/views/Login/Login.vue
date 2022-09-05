<template>
  <h1 class="head">Login</h1>
  <div class="main">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="phoneValue"
            name="phone"
            label="phone"
            placeholder="Enter your phone"
            size="large"
            autocomplete=""
            :rules="[{ required: true, message: 'Phone number is required' }]"
        />
        <van-field
            v-model="pwdValue"
            type="password"
            name="password"
            label="password"
            placeholder="Enter your password"
            size="large"
            autocomplete=""
            :rules="[{ required: true, message: 'Password is required' }]"
        />
      </van-cell-group>
      <div class="cube-btn">
        <van-button round block type="primary" size="large" native-type="submit">
          Login
        </van-button>
      </div>
    </van-form>

    <router-link class="reg" to="/register">register</router-link>
  </div>
  <common-footer/>

</template>

<script>
import {loginApi} from "@/api/getData";
import {reactive, toRefs} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import store from "@/store";
import CommonFooter from "@/components/CommonFooter";

export default {

  name: "Login",
  components:{CommonFooter},
  setup() {
    let values=reactive({
      phoneValue:'',
      pwdValue:'',
    })
    const router=useRouter();

    let onSubmit = () => {
      loginApi(values.phoneValue, values.pwdValue).then(res=>{
        if(res.data.code==0){
          localStorage.setItem("token",res.data.data);
          //vuex
          store.dispatch("setToken",res.data.data);
          router.push({path:"/personal"})
        } else {
          Toast.fail('Login Fail');
        }
      })
    };


    return {
      ...toRefs(values), onSubmit
    };
  },

}
</script>

<style lang="scss" scoped>
.head{
  padding: 30px 0;
  margin: 70px 0 0 0;
  text-align: center;
  background-color: antiquewhite;
}
.main {
  padding: 50px 5% 0;
  text-align: center;
}
// 登录
.cube-btn {
  text-align: center;
  margin-top: 20px;
}
//注册
.reg {
  display: inline-block;
  color: #666666;
  margin-top: 30px;
  font-size: 18px;
}
</style>