<template>
  <div class="login" v-if="!isAdded">
    <h2>Say yor name, bitch</h2>
    <div class="login__input-line">
      <p>Call me like</p>
      <input class="login__input" v-model.trim="username" />
    </div>
    <button class="login__button" @click="addUser">Yes, it's my name</button>
  </div>
  <Messager v-else/>
</template>

<script>
import Messager from '@/components/Messager.vue'
import { useUsers, username, isAdded } from '../composables/useUsers'
import { socket } from '@/composables/useSocket'

export default {
  name: 'Chat',
  components: {
    Messager
  },
  setup () {
    const { setUsers, deleteUser, addUser: addNewUser } = useUsers()

    socket.on('user left', (id) => {
      console.log(id)
      deleteUser(id)
    })

    socket.on('new user', (data) => {
      addNewUser(data)
    })

    socket.on('get users', (data) => {
      setUsers(data)
    })

    const addUser = () => {
      if (username.value === '') return
      try {
        socket.emit('add user', username.value)
        socket.emit('get users')
        addNewUser({ name: username.value, id: socket.id })
        isAdded.value = true
      } catch (e) {
        console.log(e)
      }
    }
    return {
      username,
      isAdded,
      addUser
    }
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
