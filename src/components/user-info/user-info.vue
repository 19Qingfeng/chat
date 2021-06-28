<template>
  <teleport to="body">
    <transition appear name="slide-card">
      <div v-if="isShow" class="user-info">
        <header class="header">
          <h1>User Info</h1>
        </header>
        <scroll ref="scrollRef" class="scroll">
          <section class="body">
            <div class="avatar-wrapper">
              <img class="avatar" v-lazy="avatar" />
              <div class="right">
                <div class="info">
                  <p class="first">{{ name }}</p>
                  <p class="second">
                    <span class="age">{{ age }}</span>
                    <span class="gender">{{ formatGender }}</span>
                  </p>
                </div>
                <div class="icon-list">
                  <img
                    class="from-app icon"
                    src="https://ugc.theyellow.app/photo/2021/05/06/08/12c120d9-78a5-41cb-a5f6-787283681b01.png"
                  />
                </div>
              </div>
            </div>
            <div class="coins">Coins: {{ coins }} ({{ subscribe }})</div>
            <div class="base-info">
              <p class="item">
                <i class="base-icon iconfont icon-time"></i>
                {{ time }}
              </p>
              <p class="item">
                <i class="base-icon iconfont icon-yonghu"></i>
                {{ id }}
              </p>
              <p class="item">
                <i class="base-icon iconfont icon-location"></i>
                {{ location }}
              </p>
            </div>
            <div class="hr" />
            <p class="bio">
              <i class="iconfont icon-bio"></i>
              {{ bio || "none" }}
            </p>
            <div class="hr" />
            <div class="tags">
              <div class="operation">
                <i class="iconfont icon-tag"></i>
                <span class="add" @click="addTags">+</span>
              </div>
              <div class="tag-list">
                <div class="tag-item">tag1</div>
                <div class="tag-item">tag1</div>
              </div>
            </div>
            <div class="remark-wrapper">
              <p class="operation">
                <span class="title">Note</span>
                <span class="add">+</span>
              </p>
              <div class="remark">
                <el-input
                  v-model="remark"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                ></el-input>
                <p v-if="currentRemark" class="current-remark">
                  {{ currentRemark }}
                </p>
              </div>
            </div>
            <div class="profile">
              <p class="title">Media</p>
              <div class="image-wrapper">
                <!-- 写一个空的指令 如果是空那么应该也有所展示 -->
                <el-image
                  append-to-body
                  v-for="(item, index) in profile"
                  :key="index"
                  class="image-item"
                  :src="item.thumb_url"
                  :preview-src-list="[item.url]"
                  @load="onLoad"
                >
                  <template #placeholder>
                    <div class="image-slot">
                      <div class="loading-image-item">Loading..</div>
                    </div>
                  </template>
                </el-image>
              </div>
            </div>
          </section>
        </scroll>
        <footer class="footer">
          <el-button class="close-btn" type="primary" @click="hide"
            >Close</el-button
          >
        </footer>
      </div>
    </transition>
  </teleport>
</template>
<script>
import Scroll from '@/components/base/scroll/scroll.vue'
import { mapState } from 'vuex'
export default {
  name: 'user-info',
  components: {
    Scroll
  },
  props: {
    avatar: {
      type: String,
      default: 'https://img0.baidu.com/it/u=3101694723,748884042&fm=26&fmt=auto&gp=0.jpg'
    },
    name: {
      type: String,
      default: 'Susanna'
    },
    age: {
      type: Number,
      default: 25
    },
    gender: {
      type: Number,
      default: 0
    },
    coins: {
      type: Number,
      default: 25
    },
    subscribe: {
      type: String,
      default: 'subscribed'
    },
    time: {
      type: String,
      default: '2021-06-25 03:22:03'
    },
    id: {
      type: Number,
      default: 400113
    },
    location: {
      type: String,
      default: 'US New York City'
    },
    bio: {
      type: String,
      default: 'this is bio ,this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio this is bio .'
    },
    profile: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false,
      currentRemark: 'This is current remark.',
      remark: ''
    }
  },
  watch: {
    'viewInfo.id': {
      immediate: true,
      handler() {
        if (this.isShow) {
          this.hide()
          setTimeout(() => {
            this.show()
          }, 300)
          return;
        }
        this.show()
      }
    }

  },
  computed: {
    ...mapState('chat', ['viewInfo']),
    formatGender() {
      const genderList = ['未知', '男', '女']
      return genderList[this.gender]
    }
  },
  methods: {
    onLoad() {
      this.$refs['scrollRef'].bs.refresh()
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    addTags() {
      console.log('添加Tag')
    }
  }
}
</script>
<style lang="scss">
.user-info {
  .el-textarea__inner {
    background-color: transparent !important;
    color: $color-text;
  }
}
</style>
<style lang="scss" scoped>
.user-info {
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20vw;
  min-width: 300px;
  height: 100%;
  padding: 0 20px 0 30px;
  box-sizing: border-box;
  background-color: $color-background-l;
  color: $color-text;
  @include use-shadow(#fff);
  overflow: hidden;
  .header {
    position: relative;
    height: 48px;
    line-height: 48px;
    margin: 10px 20px;
    text-align: center;
    font-size: $font-size-medium-x;
  }
  .scroll {
    height: calc(100% - 120px);
    width: 100%;
    overflow: hidden;
    .body {
      .hr {
        border-bottom: 1px solid #5c5d61;
        margin: 20px -10px;
      }
      .avatar-wrapper {
        display: flex;
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-left: 20px;
          .info {
            font-size: $font-size-small;
            .first,
            .second {
              margin-top: 10px;
            }
          }
          .icon-list {
            margin-top: 10px;
            > img {
              border-radius: 50%;
              width: 24px;
              height: 24px;
            }
          }
        }
      }
      .coins {
        color: #e23a3a;
        font-size: $font-size-small;
        margin: 20px 0;
      }
      .base-info {
        font-size: $font-size-small;
        color: $color-text-l;
        .item {
          margin: 20px 0;
          display: flex;
          align-items: center;
          .base-icon {
            margin-right: 10px;
          }
        }
      }
      .bio {
        font-size: $font-size-small;
        color: $color-text-l;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
        .item {
          margin-right: 10px;
        }
      }
      .tags {
        font-size: $font-size-small;
        .operation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > i {
            margin-right: 5px;
          }
        }
        .tag-list {
          margin-top: 10px;
          .tag-item {
            margin-right: 5px;
            padding: 5px 15px;
            border-radius: 5px;
            display: inline-block;
            background-color: $color-background-ll;
          }
        }
      }
      .remark-wrapper {
        margin-top: 20px;
        font-size: $font-size-small;
        .operation {
          .title {
            font-size: $font-size-medium-x;
          }
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .current-remark {
          background-color: $color-background-ll;
          padding: 5px;
          color: #000;
          margin-top: 2px;
          border-radius: 5px;
        }
      }
      .profile {
        margin-top: 20px;
        .titile {
          font-size: $font-size-medium-x;
        }
      }
      .image-wrapper {
        display: flex;
        flex-wrap: wrap;
        .image-item {
          object-fit: fill;
          flex: 0 0 calc(33.3% - 10px);
          height: 100px;
          margin: 10px 5px;
        }
        .loading-image-item {
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $font-size-small;
        }
      }
    }
  }

  .footer {
    .close-btn {
      width: calc(100% - 60px);
      margin: 0 10px;
      position: absolute;
      bottom: 0;
    }
  }
  // 通用+号
  .add {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: $color-background-ll;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.slide-card-enter-active,
.slide-card-leave-active {
  transition: transform 0.3s;
}

.slide-card-enter-from,
.slide-card-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>