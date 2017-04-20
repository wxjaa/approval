import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward',
  isSave: false,
  dataStore: [],
  title: '',
  TableComponentsTotal: 0
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
