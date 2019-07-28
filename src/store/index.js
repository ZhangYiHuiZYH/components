import Vue from 'vue'
import Vuex from 'vuex'
import user from '../ucenter/user'
import app from './app'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        user,
        app,
    },
	getters,
})

export default store;