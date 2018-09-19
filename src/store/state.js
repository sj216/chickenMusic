import {playMode} from '@/common/js/config'

const state = {
  singer: {}, // 保存歌手信息
  playing: false, // 播放器的两个播放状态  播放和暂停
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 设置播放模式
  currentIndex: -1, // 当前播放歌曲的索引值
  disc: {}, // 定义一个歌单对象
  topList: {} // 排行榜对象信息
}

export default state
