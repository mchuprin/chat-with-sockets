<template>
  <div id="app" class="app">
    <Chat/>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    Chat
  }
}
</script>

<style>
* {
  margin: 0;
}

.app {
  background-image: url("../../chat-front2/src/assets/background.png");
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
