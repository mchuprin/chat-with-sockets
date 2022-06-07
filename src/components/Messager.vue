<template>
  <div class="room">
    <div class="room__messages">
      <div v-for="msg in sortedMessages" :key="msg.time">
        <p>{{ msg.msg }}</p>
      </div>
      <div v-if="typingUsers">
        <p>{{ typingUsers.join(', ')}}</p>
      </div>
      <div class="room__input">
        <input @click="typing" v-model.trim="msgText" @keyup.enter="sendMsg">
        <button @click="sendMsg">Send</button>
      </div>
    </div>
    <div class="room__users">
      <h2>Users in the room</h2>
      <div v-for="(user, index) in allUsers" :key="index">
        <p>{{ user.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { allUsers, username } from '../composables/useUsers'
import { socket } from '../composables/useSocket'

export default {
  name: 'Messager',
  setup () {
    socket.on('message:received', (data) => {
      console.log(data)
    })

    socket.on('get messages', (data) => {
      console.log('msg', data)
      data.forEach(msg => messages.value.push(msg))
    })

    socket.on('typing', (id) => {
      console.log(allUsers.value.find(user => {
        if (user.id === id) return user.name
      }))
      typingUsers.value.push(allUsers.value.find(user => {
        if (user.id === id) return user.name
      }))
    })

    const typingUsers = ref([])
    const msgText = ref('')
    const messages = ref([])

    const sortedMessages = computed(() => {
      console.log(messages)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return messages.value.sort((a, b) => a.time - b.time)
    })

    const typing = () => {
      console.log('type')
      socket.emit('typing', socket.id)
      // setTimeout(() => socket.emit('stop typing', socket.id), 1000)
    }

    const sendMsg = () => {
      console.log(msgText.value)
      socket.emit('new message', { msg: msgText.value, author: username.value, time: Date.now() })
      msgText.value = ''
    }

    return { msgText, sendMsg, username, allUsers, sortedMessages, typing, typingUsers }
  }
}
</script>

<style lang="scss" scoped>
h2,p {
  color: white;
}
.room {
  display: flex;
  &__messages {
    border-radius: 10px 0 0 10px;
    background: #2c2b39;
    position: relative;
    width: 60vw;
    height: 80vh;
  }
  &__users {
    border-radius: 0 10px 10px 0;
    box-sizing: border-box;
    width: 20vw;
    height: 80vh;
    background: #1b2125;
    display: flex;
    flex-direction: column;
    right: 0;
    padding: 10px;
    //border-left: white solid 1px;
  }
  &__input {
    z-index: 100;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    input {
      padding: 0 15px;
      box-sizing: border-box;
      border-radius: 10px 0px 0px 10px;
      width: 80%;
      height: inherit;
      outline: none;
      border: none;
    }
    button {
      height: inherit;
      width: 20%;
      outline: none;
      border: none;
      background: #9e5c79;
      color: white;
    }
    button:active {
      outline: #853655 solid 1px;
    }
  }
}

</style>
