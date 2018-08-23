<template>
  <div class="singer">
    <list-view
      :data="singers"
      @select="selectSinger"
    />
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from '../../api/singer'
import {ERR_OK} from '../../api/config'
import Singer from '@/common/js/singer.js'
import ListView from '@/base/listview/listview'
import { mapMutations } from 'vuex'

const HOT_NAMR = '热门'
const HOT_SINGER_LENGTH = 10

export default{
  name: 'singer',
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    selectSinger(singer) { // item实际是一个singer实例
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    // 得到歌手列表
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalliseSinger(res.data.list)
        }
      })
    },
    _normalliseSinger(list) {
      let map = {
        hot: {
          title: HOT_NAMR,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // TODO 为了得到有序列表我们需要处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAMR) {
          hot.push(val)
        }
      }
      // 将数组按照字母顺序进行排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
