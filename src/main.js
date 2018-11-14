// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'es6-promise/auto'
import store from './store/index'

import WeiChatWebView from "./piiiy.js"

//console.log(WeiChatWebView)

WeiChatWebView.ready(function(){
  Vue.config.productionTip = false
  Vue.use(Mint);
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })  
})

