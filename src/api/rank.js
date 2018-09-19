import {commonParams} from './config'
import axios from 'axios'

export function getTopList() {
  const url = '/api/getTopList'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
