export default{
  changeLoading({commit}, isLoading){
    commit('UPDATE_LOADING', isLoading)
  },
  changeIsSave({commit}, isSave){
    commit('updata_isSave', isSave)
  },
  changeTitle({commit}, title){
    commit('update_title', title)
  },
  updateData({commit}, data){
    commit('update_data', data)
  },
  updateDateByIdx({commit}, obj){
    commit('update_dateByIdx',obj)
  },
  addTableComponentsTotal({commit}){
    commit('addTableComponentsTotal')
  }
}
