<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length > 0" ref="playBtn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs"
      :probeType="probeType"
      :lisenScroll="lisenScroll"
      @scroll="scroll"
      class="list"
      ref="list">
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          @select="selectItem"
        />
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading/>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import Loading from '@/base/loading/loading'
import { prefixStyle } from '../../common/js/dom'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 40

const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  name: 'music-list',
  components: {
    Scroll,
    SongList,
    Loading
  },
  data() {
    return {
      scrollY: 0,
      imageHeight: 0
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  created() {
    this.probeType = 3
    this.lisenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    // 歌曲列表距离顶部得距离 = 背景图的高度
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
  },
  watch: {
    // 通过监听scrollY的值的变化来给layer进行赋值
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      // 设置一个变量 实现滚动到顶部的时候不文字遮住，不显示出来
      let zIndex = 0
      // 实现跟随滚动，背景图的缩小放大功能
      let scale = 1
      // 下拉过程中有一个模糊的效果
      let blur = 0
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      // bglayer的高度是100%，就是屏幕的高度
      // 我们需要做限制让bglayer不是无限制的永远滚动，而是滚动到一定高度之后就不滚动了，因此需要设置最大的滚动距离
      const percent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20) // 向上滑动的时候有高斯模糊的效果
      }
      this.$refs.filter.style[backdrop] = `blur(${blur})` // 这个属性只有ios能看到
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style[transform] = `scale(${scale})`
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ]),
    random() {
      this.randomPlay({
        list: this.songs
      })
    },
    scroll(pos) {
      this.scrollY = pos.y // 实时拿到scrollY的值
    },
    back() {
      this.$router.back()
    },
    selectItem(item, index) {
      // 设置当前的playList,currentList,playstate,fullScreen
      this.selectPlay({
        list: this.songs,
        index
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
