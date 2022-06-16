import { createStore } from 'vuex'
import modules from './modules'
import createPersistedState from "vuex-persistedstate"
export default createStore({
  plugins:[
    createPersistedState({
      storage:window.sessionStorage,
      paths:['menuName','sideNav','theme'],
    })
  ],
  modules
})
