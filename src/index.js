import Vue from 'vue'
import router from './router'
import App from './App'
import Vuetify from 'vuetify'
import store from './store/index'

import 'vuetify/dist/vuetify.min.css'
import 'assets/css/app.styl'

Vue.use(Vuetify, {
  icons: {
    iconfont: 'fa'
  }
})

Vue.prototype.$apiServer = 'https://us-central1-crud-hot-dog-18d68.cloudfunctions.net'

new Vue({
  vuetify: new Vuetify(),
  store,
  router,
  render: h => h(App)
}).$mount('#app')
