export default{
  UPDATE_LOADING (state, status) {
    state.isLoading = status
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  update_isSave(state, isSave){
    state.isSave = isSave
  }
}
