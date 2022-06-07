import { createApp } from 'vue'
import App from './App.vue'
//
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://metinseylan.com:1992')
// }))

const app = createApp(App)
app.mount('#app')
