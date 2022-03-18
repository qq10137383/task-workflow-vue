import Vue from 'vue'
import Router from 'vue-router'
import WorkflowDemo from '@/views/WorkflowDemo'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: WorkflowDemo
  }]
})
