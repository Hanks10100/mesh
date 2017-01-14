// import Vue from 'vue'
import mesh from '../src/index'
import App from './mesh/nested.vue'

Vue.use(mesh)

App.el = '#root'
new Vue(App)
