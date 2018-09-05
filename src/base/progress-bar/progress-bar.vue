<template>
  <!-- 进度条的总长度 -->
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <!-- 进度条走过的位置 -->
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <!-- 按钮当前音乐播放的进度 -->
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {prefixStyle} from '../../common/js/dom'

const transform = prefixStyle('transform')
const progressBtnWidth = 16 // 按钮的宽度

export default {
  name: 'progress-bar.vue',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = newPercent * barWidth
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0,0)`
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border-radius: 50%
          background: #fff
          &:after
            content: ""
            display: inline-block
            position: absolute
            width: 12px
            height: 12px
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            border-radius: 50%
            background: $color-theme
</style>
