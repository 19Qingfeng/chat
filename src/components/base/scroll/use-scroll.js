import { ref, onMounted, onUnmounted } from 'vue';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import MouseWheel from '@better-scroll/mouse-wheel';
import Pullup from '@better-scroll/pull-up';

BScroll.use(Pullup);
BScroll.use(MouseWheel);
BScroll.use(ObserveDOM);

const THRESHOLD = 70;
const STOP = 56;

export default function useScroll(wrapper, option, ctx) {
  const bs = ref(null);
  const isPullUpLoad = ref(true);

  onMounted(() => {
    bs.value = new BScroll(wrapper.value, {
      scrollX: false,
      scrollY: true,
      ObserveDOM: true,
      pullDownRefresh: {
        threshold: THRESHOLD,
        stop: STOP,
      },
      pullUpLoad: {
        threshold: -THRESHOLD,
      },
      ...option,
    });
    if (option.pullUpLoad) {
      bs.value.on('pullingUp', () => {
        isPullUpLoad.value = false;
        ctx.emit('pullingUp', finallyUp);
      });
    }
  });
  onUnmounted(() => {
    bs.value.destroy();
  });

  function finallyUp() {
    return new Promise((resolve) => {
      setTimeout(() => {
        bs.value.finishPullUp();
        bs.value.refresh();
        isPullUpLoad.value = true;
        resolve();
      }, 1000);
    });
  }
  return {
    isPullUpLoad,
    bs,
  };
}
