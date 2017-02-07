// import Vue from 'vue'
import mesh from '../src/mesh.js'
import App from './sample.vue'

Vue.use(mesh)

App.el = '#root'
new Vue(App)
