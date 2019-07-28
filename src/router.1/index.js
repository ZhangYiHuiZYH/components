import Vue from 'vue'
import Router from 'vue-router'

const subject_query = resolve => require(['@/components/subject_query'],resolve)

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/subject_query',
      component:subject_query
    }
  ]
})
