import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/pages/rank/rank'
import Recommend from '@/pages/recommend/recommend'
import Search from '@/pages/search/search'
import Singer from '@/pages/singer/singer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})