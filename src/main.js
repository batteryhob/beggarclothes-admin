import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueLazyload from 'vue-lazyload'
import router from './router'

Vue.use(VueLazyload)
Vue.config.productionTip = false
Vue.config.strict = true


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
