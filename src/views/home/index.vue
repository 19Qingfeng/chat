<template>
  <div class="home">
    <scroll class="scroll-wrapper" :pullUpLoad="true" @pullingUp="pullingUp">
      <div class="card-wrapper">
        <m-card
          v-for="i in cardList"
          :key="i"
          class="card-item"
          :chat-room-id="i.room_id"
          :user-avatar="i.userAvatar"
          :user-id="i.userId"
          :name="i.userName"
          :message="i.lastMessage"
          :time="i.updateTs"
          :count="i.unread"
          :on-line="i.onLine"
          :robot-id="i.robotId"
          :robot-avatar="i.robotAvatar"
          @clickUser="clickUser"
          @clickInfo="openChatRoom"
          @clickRobot="clickRobot"
        />
      </div>
    </scroll>

    <user-info
      ref="infoRef"
      v-if="viewInfo"
      :id="viewInfo.id"
      :avatar="viewInfo.avatar"
      :name="viewInfo.name"
      :bio="viewInfo.bio"
      :location="viewInfo.location"
      :profile="viewInfo.profile"
    />

    <talking-room ref="roomRef" />
  </div>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll.vue'
import MCard from '@/components/base/card/card.vue'
import UserInfo from '@/components/user-info/user-info.vue'
import TalkingRoom from '@/components/talking-room/index.vue'
import Message from '@/assets/js/message.js'
import { getChatListApi } from '@/api/chat/index.js'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  components: {
    Scroll,
    MCard,
    UserInfo,
    TalkingRoom
  },
  setup() {
    const infoRef = ref(null)
    const roomRef = ref(null)
    const cardList = ref([])
    const originList = []
    const store = useStore()

    const filterType = computed(() => store.state.chat.filterType)
    const isStar = computed(() => store.state.chat.isStar)
    const search = computed(() => store.state.chat.search)
    const viewInfo = computed(() => store.state.chat.viewInfo)

    async function pullingUp(done) {
      await getList()
      done()
    }

    // 记录Id 是否相等
    function clickUser({ id }) {
      const info = findViewInfo(id, 'user')
      store.dispatch('chat/setViewInfo', info)
    }

    function openChatRoom() {
      roomRef.value.showTalkingRoom()
      // 同样设置一下chat的信息
    }

    function clickRobot({ id }) {
      const info = findViewInfo(id, 'robot')
      store.dispatch('chat/setViewInfo', info)
    }

    function findViewInfo(id, key) {
      const current = originList.find(i => {
        const robotInfo = i.bot_info
        const userInfo = i.user_info.user_info
        if (key === 'robot') {
          return robotInfo.id === id
        } else {
          return userInfo.user_id === id
        }
      })
      const isRobot = key === 'robot'
      const baseInfo = isRobot ? current.bot_info : current.user_info.user_info
      return {
        avatar: getBotAvatar(baseInfo.cover),
        name: baseInfo.name,
        bio: baseInfo.bio,
        coins: '', // 金币 不知道
        time: '', // 时间
        id: isRobot ? baseInfo.id : baseInfo.user_id,
        location: atob(baseInfo.city),
        profile: getProfile(baseInfo.ablum),
        from_app: baseInfo.from_app,
        birthday: baseInfo.birthday
      }
    }

    // 获取参数Params
    function getParams() {
      const params = {
        cursor: cardList.value.length ? getCursor() : Date.now(),
        order: filterType.value, // vuex中拿
        limit: 30,
        star: isStar.value === 0 ? undefined : isStar.value, // vuex中拿
        searchId: search.value, // 查找到的search内容
      }
      // 获取参数
      return params
    }

    function getCursor() {
      const orderVal = filterType.value
      const lastChatRoom = cardList.value[cardList.value.length - 1]
      return orderVal === 'reply_ts' ? lastChatRoom['reply_ts'] : lastChatRoom['update_ts']
    }

    function getProfile(profileString) {
      if (!profileString) {
        return []
      }
      try {
        return JSON.parse(profileString)
      } catch {
        return profileString
      }
    }

    function getBotAvatar(string) {
      if (!string || string === '') {
        return 'none'
      }
      try {
        return JSON.parse(string).url
      }
      catch {
        return string.url
      }
    }

    function formatCardData(data) {
      return data.filter(i => i.bot_info).map(({
        user_info,
        chat_room,
        bot_info
      }) => {
        return {
          roomId: chat_room.room_id,
          updateTs: chat_room.update_ts, // 回复消息时间
          createTs: chat_room.create_ts, // 创建房间时间
          userName: user_info.user_info.name,
          userAvatar: user_info.user_info.cover.url,
          userId: user_info.user_info.user_id,
          lastMessage: Message.getContextByMessage(chat_room.last_msg)?.title || '',
          online: user_info.online === 1, // 1在线
          robotAvatar: getBotAvatar(bot_info.cover),
          robotId: bot_info.id,
          unread: chat_room.unread
        }
      })
    }

    async function getList() {
      const params = getParams()
      const {
        chat_state,
        room_count,
        room_list,
        user_chat_count
      } = await getChatListApi(params)
      cardList.value.push(...formatCardData(room_list))
      originList.push(...room_list)
      console.log(chat_state, room_count, room_list, user_chat_count)
    }

    getList()

    return {
      infoRef,
      roomRef,
      cardList,
      viewInfo,
      clickUser,
      openChatRoom,
      clickRobot,
      pullingUp
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: fixed;
  top: 34px;
  padding-top: 40px;
  bottom: 0;
  width: 100%;
  background-color: $color-background-d;
  color: $color-text;
  .scroll-wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .card-wrapper {
      margin: 20px;
      display: flex;
      flex-wrap: wrap;
      > .card-item {
        flex: 0 0 calc(25% - 22px);
        width: calc(25% - 22px);
        height: 88px;
        margin: 10px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
