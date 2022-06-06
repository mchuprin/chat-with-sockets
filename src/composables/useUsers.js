import { reactive } from 'vue'

export useMessage = () => {
  const users = reactive([]);
  return { users }
}
