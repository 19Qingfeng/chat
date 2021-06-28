const mutations = {
  setSearchValue(state, value) {
    state.search = value;
  },
  setFilterType(state, type) {
    state.filterType = type;
  },
  setStar(state, isStar) {
    state.isStar = isStar;
  },
  setViewInfo(state, info) {
    state.viewInfo = info;
  },
};

export default mutations;
