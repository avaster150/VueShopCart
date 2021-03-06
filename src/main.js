import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import store from './store'
import VueMask from 'v-mask'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMask);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')