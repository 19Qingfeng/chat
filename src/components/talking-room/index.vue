<template>
  <teleport to="body">
    <transition name="room-fade">
      <div class="talking-room" v-if="isChat">
        <header class="header">
          <div class="avatar user-avatar">
            <img class="avatar" v-lazy="userAvatar" />
          </div>
          <div class="user-info">
            <h2>{{ userName }}</h2>
            <p>create Time: {{ createTime }}</p>
          </div>
          <div class="robot-avatar">
            <img class="avatar" v-lazy="robotAvatar" />
          </div>
          <div class="close" @click="hideTalkingRoom">
            <i class="iconfont icon-guanbi1"></i>
          </div>
        </header>
        <scroll class="talking-scroll"> 聊天内容 </scroll>
        <div class="opeartion">
          <el-button class="op-btn" size="mini" type="primary"
            >Send Gift</el-button
          >
          <el-button class="op-btn" size="mini" type="primary"
            >Send Game</el-button
          >
          <el-button class="op-btn" size="mini" type="primary"
            >Send Photo</el-button
          >
          <el-button class="op-btn" size="mini" type="primary"
            >Send Video</el-button
          >
        </div>
        <footer class="sender">
          <div class="sender-wrapper">
            <i class="iconfont icon-biaoqing"></i>
            <el-input
              ref="inputRef"
              v-model="message"
              size="mini"
              type="primray"
              class="transparent-input"
              @keydown.enter="sendMessage"
            ></el-input>
            <i class="iconfont icon-fasong" @click="sendMessage"></i>
          </div>
        </footer>
      </div>
    </transition>
  </teleport>
</template>
<script>
import { ref, toRefs } from 'vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import useInit from './use-init'
export default {
  name: "talking-room",
  components: {
    Scroll
  },
  props: {
    width: {
      type: [Number, String],
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    roomConfig: {
      type: Object,
      default: () => ({
        userAvatar: '',
        robotAvatar: '',
        userName: 'userName',
        createTime: '2020-06-12 12:00:00'
      })
    }
  },
  setup(props) {
    const isChat = ref(true)
    const message = ref('')

    const { inputRef } = useInit(isChat)

    function sendMessage() {
      // 发送消息
      console.log('发送消息', message.value)
    }

    function showTalkingRoom() {
      isChat.value = true
    }

    function hideTalkingRoom() {
      isChat.value = false
    }

    function toggleTalkingRoom() {

    }

    return {
      ...toRefs(props.roomConfig),
      isChat,
      message,
      sendMessage,
      showTalkingRoom,
      hideTalkingRoom,
      toggleTalkingRoom,
      // useInit
      inputRef
    }
  }
}
</script>
<style lang="scss" scoped>
.talking-room {
  position: fixed;
  z-index: 999;
  min-width: 560px;
  left: 50%;
  top: 10%;
  transform: translate3d(-50%, 0, 0);
  border-radius: 10px;
  height: 600px;
  background-color: #000;
  @include use-shadow(rgba(255, 255, 255, 0.8));
  min-width: 700px;
  .header {
    background-color: $color-background-h;
    padding: 10px;
    border-radius: 10px;
    top: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    line-height: 26px;
    display: flex;
    box-sizing: border-box;
    .avatar {
      border-radius: 50%;
      width: 36px;
      height: 36px;
      margin: 0 10px;
    }
    .user-avatar,
    .robot-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user-info {
      margin-left: 10px;
      flex: 1;
      color: $color-text;
      h2 {
        font-size: $font-size-medium;
      }
      p {
        font-size: $font-size-small;
      }
    }
    .close {
      display: flex;
      align-items: center;
      height: 100%;
      color: $color-text;
      flex: 0 0 30px;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: $color-highlight-background;
      }
    }
  }
  .talking-scroll {
    position: absolute;
    width: 100%;
    background-color: #000;
    bottom: 85px;
    top: 60px;
  }
  .opeartion {
    position: absolute;
    height: 35px;
    bottom: 50px;
    background-color: #000;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .sender {
    position: absolute;
    height: 50px;
    bottom: 0;
    width: 100%;
    background-color: $color-background-h;
    display: flex;
    align-items: center;
    .sender-wrapper {
      display: flex;
      align-items: center;
      margin: 0 10px;
      flex: 1;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      .iconfont {
        cursor: pointer;
        color: $color-text-l;
        font-size: $font-size-medium-x;
        padding: 0 10px;
      }
      .icon-fasong {
        color: $color-highlight-background;
      }
    }
  }
  &.room-fade-enter-active {
    animation: confirm-fadein 0.3s;
    .op-btn {
      animation: confirm-zoom-in 0.3s;
    }
  }
  &.room-fade-leave-active {
    animation: confirm-fadeout 0.3s;
    .op-btn {
      animation: confirm-zoom-out 0.3s;
    }
  }
}
@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>