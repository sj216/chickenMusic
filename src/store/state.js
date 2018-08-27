import {playMode} from '@/common/js/config'

const state = {
  singer: {},
  playing: false, // 播放器的两个播放状态  播放和暂停
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 设置播放模式
  currentIndex: -1 // 当前播放歌曲的索引值
}

export default state
