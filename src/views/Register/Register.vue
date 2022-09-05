<template>
  <h1 class="head">Register</h1>
  <div class="main">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="nameValue"
            name="name"
            label="name"
            placeholder="Enter your name"
            size="large"
            autocomplete=""
            :rules="[{ required: true, message: 'Name is required' }]"
        />
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
      <div class="reg-btn">
        <van-button round block type="primary" size="large" native-type="submit">
          register
        </van-button>
      </div>
    </van-form>

    <router-link class="login-btn" to="/login">login</router-link>
  </div>
</template>

<script>
import {registerApi} from "@/api/getData";
import {reactive, toRefs} from "vue";
import {Toast} from "vant";

export default {
  name: "Register",
  setup() {
    let values=reactive({
      phoneValue:'',
      pwdValue:'',
      nameValue:'',
    })
    let onSubmit = () => {
      registerApi(values.phoneValue, values.pwdValue, values.nameValue).then(res=>{
        if(res.data.code==0){
          Toast.success('Register Success');
        } else {
          Toast.fail('Register Fail');
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
//注册
.reg-btn {
  margin: 50px 20px 0 20px;
}
// 登录
.login-btn {
  color: #666666;
  font-size: 18px;
  display: inline-block;
  margin-top: 30px;
}
</style>