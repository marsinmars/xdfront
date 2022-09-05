import { createStore } from 'vuex'

export default createStore({
  state: {
    token:localStorage.getItem("token")||''
  },
  getters: {
  },
  //同步修改
  mutations: {
    SET_TOKEN:(state,token)=>{
      state.token=token;
    }
  },
  //异步调用mutations方法
  actions: {
    setToken(context,token){
      context.commit('SET_TOKEN',token)
    },

    clearToken(context){
      context.commit('SET_TOKEN','')
    }
  },
  modules: {
  }
})
