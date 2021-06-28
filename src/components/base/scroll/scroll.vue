<template>
  <div ref="rootRef">
    <div>
      <slot></slot>
      <div class="pullup-tips" v-if="pullUpLoad">
        <div v-if="isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">Pull up and load more</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref } from "vue";
import useScroll from "./use-scroll";

export default {
  name: "Scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const rootRef = ref(null);
    const { bs, isPullUpLoad } = useScroll(rootRef, props, ctx);
    return {
      rootRef,
      bs,
      isPullUpLoad,
    };
  },
};
</script>
<style lang="scss" scoped>
.pullup-tips {
  padding: 20px;
  text-align: center;
  color: #999;
  .pullup-txt {
    color: $color-text-d;
  }
}
</style>
