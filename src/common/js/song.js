import {getLyric} from '../../api/song'
import {ERR_OK} from '../../api/config'
import { Base64 } from 'js-base64'

export default class Song { // 类的扩展性比对象好很多，面向对象的编程方式
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          // reject('noLyric')
        }
      }).catch((err) => {
        console.log(err)
      })
    })
  }
}

export function createSong(musicData, songVkey, guid) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://124.193.230.13/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=406626400&vkey=724797A39C699A7A07102952F5F6AD21BF60892EC285D1EB9DE03682832727F1E1DC27A324CBC26ACF0CC7F7FC33A7D1CA51B6FA5AF6CBA1&uin=0&fromtag=38`
  })
}

// 处理多个歌手的数据结构
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
