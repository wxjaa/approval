export default{
  UPDATE_LOADING (state, status) {
    state.isLoading = status
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  update_isSave(state, isSave){
    state.isSave = isSave
  },
  update_title(state, title){
    state.title = title
  },
  update_data(state, data){
    state.dataStore = data
  },
  update_dateByIdx(state, obj){
    state.dataStore[obj.idx].value = obj.data
    state.TableComponentsTotal--;
    if (state.TableComponentsTotal <= 0) {
      state.TableComponentsTotal = 0
      console.log(state.dataStore)
    }

  },
  addTableComponentsTotal(state){
    state.TableComponentsTotal++
  }
}
