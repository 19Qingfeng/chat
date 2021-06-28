<template>
  <m-header />
  <router-view />
</template>
<script>
import MHeader from './components/header/header.vue'
export default {
  components: {
    MHeader
  }
}
</script>
