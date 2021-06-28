import { ref, watch, nextTick } from 'vue';

export default function useInit(isChat) {
  const inputRef = ref(null);

  watch(isChat, async (value) => {
    if (value) {
      addEventToRoomClose();
      await nextTick();
      inputRef.value.focus();
    } else {
      removeEventToRoomClose();
    }
  });

  function roomCloseEvent(event) {
    if (event.keyCode === 27) {
      isChat.value = !isChat.value;
    }
  }

  function addEventToRoomClose() {
    document.body.addEventListener('keydown', roomCloseEvent);
  }

  function removeEventToRoomClose() {
    document.body.removeEventListener('keydown', roomCloseEvent);
  }

  return {
    inputRef,
  };
}
