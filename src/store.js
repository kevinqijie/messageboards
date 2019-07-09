import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:'',
    modifyid:''
  },
  mutations: {
    receivedetails(state,msg) {
      
      state.id = msg;
    
    },
    receivemodify(state,msg) {
        state.modifyid = msg;
  } 
  },
  actions: {

  }
})
