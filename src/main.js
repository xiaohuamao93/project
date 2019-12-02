import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './common/mobileRem';
import router from './router/index';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import host from '../utils/address';

Vue.config.productionTip = false

import async from 'async';
Vue.prototype.$async = async;

import './stylesheets/reset.styl';

import util from './common/util';
Vue.prototype.$util = util;
// Vue.prototype.$host = host;
Vue.prototype.$host = '/proxy';


Vue.use(VueAxios, axios)
Vue.use(MintUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
