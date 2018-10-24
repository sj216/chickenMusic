import storage from 'good-storage'

// localStorage的相关操作都放到这个js中
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__PLAY__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

// 查找数组中是否存已经存在一个值
// compare 是一个function
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare) // 查找arr中是否已经存在这个val
  if (index === 0) { // 如果数组中已经有这条数据，并且这条数据是第一个则什么都不用做，直接return
    return false
  } else if (index > 0) { // 如果找到这条数据，并且这条数据的位置不是第一条数据则进行处理
    arr.splice(index, 1) // 首先将原数组中的这条数据删除
  }
  arr.unshift(val) // 开头插入数据
  if (maxLen && arr.length > maxLen) { // 如果数组设置了最大的长度限制而且我们的arr的长度是大于这个最大长度的，则将多余的数据从末尾删除
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 一个方法控制searchHistory的初始值
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除一条数据
export function deleteSearch(query) {
  // 先获取缓存中的search列表
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清除所有的搜索历史纪录
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 保存一条播放历史记录
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 读取播放历史记录
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 保存收藏歌曲
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 删除收藏歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 初始时加载所有的favoriteList
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
