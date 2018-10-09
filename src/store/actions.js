import * as types from './mutation-type'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'
import {saveSearch} from '@/common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSoong = function ({commit, state}, song) {
  let playList = state.playList.slice() // 复制一个playist
  let sequenceList = state.sequenceList.slice() // 返回一个副本
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playList[currentIndex]
  // 查找当前列表中是否有要待插入的歌曲，并返回其索引
  let fpIndex = findIndex(playList, song)
  // 以为是插入歌曲所以索引需要加1
  currentIndex++
  // 插入这首歌到当前索引位置
  playList.splice(currentIndex, 0, song)
  // 如果已经包含这首歌
  if (fpIndex > -1) { // 插入的序号在原序号之后
    // 如果当前插入序号大于之前列表中的序号
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else { // 插入的序号在原序号之前
      playList.splice(fpIndex + 1, 1)
    }
  }

  // 找到当前歌曲的播放列表中的位置
  //  确定在sequenceList中需要插入的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, currentSong)

  // 将song插入sequenceList中
  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 将播放历史结果保存到localstorage中
export const saveSearchHistory = function ({commit}, query) {
  // saveSearch方法将search列表保存到localStorage只并且放回一个新的search列表
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
