<template>
  <div class="login" v-if="!isAdded">
    <h2>Say yor name, bitch</h2>
    <div class="login__input">
      <p>Call me like</p>
      <input v-model="username" />
    </div>
    <button @click="addUser">Yes, it's my name</button>
  </div>
  <div class="room" v-else>
    <div class="room__input">
      <input v-model="msgText" @keyup.enter="sendMsg">
    </div>
    <div class="room__messages">

    </div>
    <div class="room__users">

    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { ref } from "vue";

export default {
  name: 'HelloWorld',
  setup() {
    // const typing = ref(false);
    const msgText = ref('');
    const username = ref('');
    const isAdded = ref(false);
    const socket = io('http://localhost:3000');

    const sendMsg = () => {
      socket.emit('new message', { msg: msgText.value, name: username.value })
    }

    const addUser = () => {
      try {
        socket.emit('add user', username.value);
        isAdded.value = true;
      } catch (e) {
        console.log(e)
      }
    }
    // socket.emit('leave', 'Brad');
    //
    // socket.on('typing', (data) => {
    //   typing.value = data;
    // })
    //
    // socket.on('stopTyping', () => {
    //   typing.value = false;
    // })
    //
    // const msgText = ref('');
    // // const room = ref('');
    //
    // const socket = io('localhost:5000')
    // console.log(socket)
    // // const connection = reactive(new WebSocket('ws://localhost:5000'));
    // //
    // // connection.onmessage = (event) => console.log('onmessage', event);
    // //
    // // connection.onopen = (event) => {
    // //   console.log(event);
    // //   console.log("Successfully connected to the echo websocket server...")
    // // }
    // //


    return { msgText, sendMsg, username, isAdded, addUser }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: #05131e7d;
  padding: 50px;
  display: flex;
  flex-direction: column;
  &__input {
    display: flex;
    flex-direction: row;
  }
}
</style>
