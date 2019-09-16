import request from '@/utils/request'

const SERVICE_BASE = '/api/base'// base服务

export function getMusicList() {
  return request({
    url: SERVICE_BASE + '/music',
    method: 'get'
  })
}

export function getMusicURL(id) {
  return request({
    url: SERVICE_BASE + `/music/${id}/url`,
    method: 'get'
  })
}

export function getMusicDetail(id) {
  return request({
    url: SERVICE_BASE + '/music/song/' + id,
    method: 'get'
  })
}

export function getMusicLyric(id) {
  return request({
    url: SERVICE_BASE + `/music/${id}/lyric`,
    method: 'get'
  })
}

