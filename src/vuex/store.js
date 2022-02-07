import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储token

    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  },

  mutations: {

  }
})
export default store
