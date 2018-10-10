import storage from 'good-storage'

// localStorage的相关操作都放到这个js中
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

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
