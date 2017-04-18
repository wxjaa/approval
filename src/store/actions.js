export default{
  changeLoading({commit}, isLoading){
    commit('UPDATE_LOADING', isLoading)
  },
  changeIsSave({commit}, isSave){
    commit('updata_isSave', isSave)
  }
}
