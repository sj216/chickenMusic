import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/pages/rank/rank'
import Recommend from '@/pages/recommend/recommend'
import Search from '@/pages/search/search'
import Singer from '@/pages/singer/singer'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Disc from '@/components/disc/disc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
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
