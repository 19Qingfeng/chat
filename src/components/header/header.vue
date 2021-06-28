<template>
  <header class="header">
    <span class="header-item sort">
      <m-filter />
    </span>
    <div class="search-wrapper header-item">
      <div class="search">
        <el-input
          size="mini"
          type="primary"
          v-model="searchVal"
          placeholder="Search User"
        >
          <template #prepend>
            <i class="iconfont icon-icon_xinyong_xianxing_jijin-"></i>
          </template>
        </el-input>
        <el-button type="primary" size="mini">Search</el-button>
      </div>
    </div>
    <div class="button-wrapper header-item">
      <el-button size="mini" type="primary">
        <i class="iconfont icon-duigou1 btn-icon"></i>
        Get Task</el-button
      >
      <el-button size="mini" type="primary">
        <i class="iconfont icon-guolv btn-icon"></i>
        Filter User</el-button
      >
      <el-button size="mini" type="primary">
        <i class="iconfont icon-tongji btn-icon"></i>
        My Statistics</el-button
      >
    </div>
    <div class="info header-item">
      <span>User: Admin</span>
      <span>Closed: Today 18:00</span>
    </div>
    <div class="layout header-item">
      <el-button size="mini" type="primary">Logout</el-button>
    </div>
  </header>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MFilter from './filter.vue'
export default {
  name: "header",
  components: {
    MFilter
  },
  setup() {
    const store = useStore()
    const search = computed(() => store.state.chat.search)

    const searchVal = computed({
      get: () => {
        return search.value
      },
      set: (val) => {
        store.commit('chat/setSearchValue', val)
      }
    })
    return {
      searchVal
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 1;
  top: 0;
  height: 74px;
  width: 100%;
  background: $color-background-h;
  border-radius: 0 0 16px 16px;
  display: flex;
  color: $color-text;
  .header-item {
    display: flex;
    justify-content: center;
    align-items: center;
    & .btn-icon {
      font-size: $font-size-medium;
      margin-right: 2px;
    }
    &.sort {
      flex: 0 0 70px;
      font-size: $font-size-bigger;
    }
    &.search-wrapper {
      flex: 0 0 360px;
      .search {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding: 5px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 5px;
      }
    }
    &.button-wrapper {
      flex: 1;
      margin-left: 20px;
      justify-content: flex-start;
    }
    &.info {
      display: flex;
      flex-direction: column;
      font-size: $font-size-small;
      margin-right: 20px;
      > span {
        margin: 5px;
      }
    }
    &.layout {
      margin-right: 20px;
    }
  }
}
</style>
<style lang="scss">
.header {
  .el-input-group__prepend,
  .el-input-group__append,
  .el-input__inner {
    color: $color-text !important;
    background: transparent !important;
    border: 0px !important;
  }
}
</style>