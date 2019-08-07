import Vue from 'vue'
import router from './router'
import App from './App'

import 'assets/css/app.styl'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$apiServer = 'https://us-central1-crud-hot-dog-18d68.cloudfunctions.net'
