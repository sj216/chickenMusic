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
      }, 20)
    }
  }
}
</script>

<style scoped>

</style>
