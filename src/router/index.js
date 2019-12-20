import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: resolve => require(['@/pages/invite/index.vue'], resolve),
      meta: {
        keepAlive: true,
        title: '测试'
      }
    },
    {
      path: '/inviteData',
      name: 'InviteData',
      component: resolve => require(['@/pages/inviteData/index.vue'], resolve),
      meta: {
        keepAlive: true,
        title: '邀请好友'
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['@/pages/index/index.vue'], resolve),
      meta: {
        keepAlive: true,
        title: '邀请列表'
      }
    }
  ]
})
