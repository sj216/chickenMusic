<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'scroll',
  props: {
    // TODO 自己查阅betterScroll看是控制是干什么的
    probeType: {
      type: Number,
      default: 1
    },
    // 是否可点击
    click: {
      typ: Boolean,
      default: true
    },
    // 实时变化的数据
    data: {
      type: Array,
      default: null
    },
    lisenScroll: {
      type: Boolean,
      default: false
    },
    // 上拉刷新
    pullup: {
      type: Boolean,
      default: false
    },
    // 避免在input获取焦点的时候调起原生键盘造成对页面的遮挡，无法进行列表的滚动
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    // 初始化scroll
    setTimeout(() => { // 确保DOM已经被渲染
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.lisenScroll) {
        let vm = this
        this.scroll.on('scroll', (pos) => {
          vm.$emit('scroll', pos)
        })
      }
      // 上拉刷新
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd') // 滚动到底部
          }
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable() // 默认开启
    },
    disable() {
      this.scroll && this.scroll.disable() // 默认关闭
    },
    refresh() {
      this.scroll && this.scroll.refresh() // 当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped>

</style>
