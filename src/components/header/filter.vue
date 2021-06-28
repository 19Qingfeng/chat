<template>
  <el-tooltip placement="right-end" effect="light">
    <template #content>
      <div v-for="btn in btnList" :key="btn.type" class="btn-wrapper">
        <el-button size="mini" :type="getBtnType(btn)" @click="btn.on(btn)">
          {{ btn.text }}
        </el-button>
      </div>
      <div v-for="(btn, i) in btnFilter" :key="i" class="btn-wrapper">
        <el-button size="mini" :type="getFilterType(btn)" @click="btn.on(btn)">
          {{ btn.text }}
        </el-button>
      </div>
    </template>
    <i class="iconfont icon-shunxu" />
  </el-tooltip>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: 'ListFilter',
  data() {
    return {
      type: 'unread',
      isStar: 0,
      btnFilter: [
        {
          text: '仅展示星标用户',
          hover: false,
          on: (btn) => {
            this.handleChangeStar(btn);
          },
        },
      ],
      btnList: [
        {
          text: '按未读消息展示',
          type: 'unread',
          on: (btn) => {
            this.handleChangeType(btn, 'unread');
            // unread, update_ts, reply_ts
          },
        },
        {
          text: '按最近消息展示',
          type: 'update_ts',
          on: (btn) => {
            this.handleChangeType(btn, 'update_ts');
          },
        },
        {
          text: '按待回消息展示',
          type: 'reply_ts',
          on: (btn) => {
            this.handleChangeType(btn, 'reply_ts');
          },
        },
      ],
    };
  },
  methods: {
    ...mapMutations('chat', ['setFilterType','setStar']),
    getFilterType(btn) {
      return btn.hover ? 'success' : 'info';
    },
    getBtnType(btn) {
      return btn.type === this.type ? 'success' : 'info';
    },
    handleChangeType(btn, type) {
      if (btn.type === this.type) return;
      this.type = btn.type;
      this.setFilterType(type)
      // this.$emit('handleChangeFilterType', type);
    },
    // 修改星标用户
    handleChangeStar(btn) {
      btn.hover = !btn.hover;
      const params = btn.hover ? 1 : 0;
      this.$emit('handleChangeStar', params);
      this.setStar(params)
      if (params === 1) {
        this.type = 'unread';
        this.setFilterType('unread')
        // this.$emit('handleChangeFilterType', 'unread');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  margin: 5px;
}
</style>