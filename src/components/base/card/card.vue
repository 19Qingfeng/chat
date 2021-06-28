<template>
  <div class="card">
    <div class="user-avatar" @click="clickUserAvatar">
      <img class="avatar" v-lazy="userAvatar" />
      <i v-if="onLine" class="on-line"></i>
    </div>
    <div class="info" @click="clickInfo">
      <h2 class="name">{{ name }}</h2>
      <p class="last-message">{{ message }}</p>
    </div>
    <div class="robot-avatar" @click="clickRobotAvatar">
      <el-badge :value="count" type="danger">
        <img class="avatar" v-lazy="robotAvatar" width="30" height="30" />
      </el-badge>
      <p class="time">{{ formatTime }}</p>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: "card",
  emits: ['clickUser', 'clickInfo', 'clickRobot'],
  props: {
    userAvatar: String,
    userId: Number,
    robotId: Number,
    chatRommId: String,
    robotAvatar: String,
    name: String,
    message: String,
    time: String,
    count: {
      type: Number,
      default: 10
    },
    onLine: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formatTime() {
      console.log(this.time, 'time')
      return moment(this.time).format('LT')
    }
  },
  methods: {
    clickUserAvatar() {
      this.$emit('clickUser', {
        id: this.userId
      })
    },
    clickInfo() {
      this.$emit('clickInfo')
    },
    clickRobotAvatar() {
      this.$emit('clickRobot', {
        id: this.robotId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 100%;
  height: 100%;
  align-items: stretch;
  justify-items: center;
  background-color: $color-sub-theme;
  border: 1px solid transparent;
  .user-avatar,
  .robot-avatar {
    display: flex;
    align-items: center;
    text-align: center;
    .avatar {
      border-radius: 50%;
      text-align: center;
    }
  }
  .user-avatar {
    position: relative;
    .avatar {
      width: 50px;
      height: 50px;
      // min-width: 50px;
      // min-height: 50px;
    }
    .on-line {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgb(0, 255, 0);
      bottom: 20px;
      right: 0;
    }
  }
  .robot-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: $font-size-small;
    height: 100%;
    .avatar {
      margin-bottom: 15px;
    }
    .time {
      color: $color-text-l;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: $font-size-small;
    width: 100%;
    margin: 0 10px;
    overflow: hidden;
    .name {
      margin-bottom: 20px;
    }
    .last-message {
      width: 100%;
      color: $color-text-l;
      @include no-wrap();
    }
  }
  &:hover {
    cursor: pointer;
    border: 1px solid $color-highlight-background;
  }
}
</style>