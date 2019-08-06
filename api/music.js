import request from '@/utils/request'

export function getMusicList() {
  return request({
    url: '/music',
    method: 'get'

  })
}

