import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  signInDialogVisible: false
}

// 定义所需的 mutations
const mutations = {
  signInDialogVisibleTrue(state) {
    state.signInDialogVisible = true;
  },
  signInDialogVisibleFalse(state) {
    state.signInDialogVisible = false;
  }
};

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
