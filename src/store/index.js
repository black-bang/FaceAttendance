import Vue from 'vue'
import Vuex from 'vuex'
import kind from './kind/index'
import detail from './detail/index'
import cart from './cart/index'
import user from './user/index'

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    kind,
    detail,
    cart,
    user
  }
})

export default store;
