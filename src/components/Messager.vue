<template>
  <div class="login" v-if="!isAdded">
    <h2>Say yor name, bitch</h2>
    <div class="login__input-line">
      <p>Call me like</p>
      <input class="login__input" v-model.trim="username" />
    </div>
    <button class="login__button" @click="addUser">Yes, it's my name</button>
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
import { io } from 'socket.io-client'
import { ref } from 'vue'

export default {
  name: 'HelloWorld',
  setup () {
    // const typing = ref(false);
    const msgText = ref('')
    const username = ref('')
    const isAdded = ref(false)
    const socket = io('http://localhost:3000')

    const sendMsg = () => {
      socket.emit('new message', { msg: msgText.value, name: username.value })
    }

    const addUser = () => {
      try {
        if (username.value === '') return
        socket.emit('add user', username.value)
        isAdded.value = true
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
h2,p {
  color: white;
}
.login {
  background: #05131e7d;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  &__input-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      padding-right: 10px;
    }
  }
  &__input {
    background:  #0a1825a3;
    padding: 5px 10px;
    border: none;
    outline: none;
    color: white;
  }
  &__button {
    background: #9e5c79;
    padding: 10px;
    color: white;
    outline: none;
    border: none;
  }
  &__button:active {
    box-sizing: border-box;
    outline: #853655 solid 2px;
  }
}
</style>
