import { ref, readonly } from 'vue'

export const username = ref('')
export const allUsers = ref([])
export const isAdded = ref(false)

export function useUsers () {
  // eslint-disable-next-line no-return-assign
  const setUsers = (newUsers) => allUsers.value = newUsers

  const addUser = (user) => allUsers.value.push(user)

  const deleteUser = (id) => {
    console.log(allUsers.value)
    allUsers.value = allUsers.value.filter(user => user.id !== id)
  }

  return { allUsers: readonly(allUsers), setUsers, addUser, deleteUser }
}
