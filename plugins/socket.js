/**
 * @file socket 服务 / ES module
 * @module plugins/socket.io
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import io from 'socket.io-client'
import { socketHost } from '~/config/api.config.esm'

const socketIO = io(socketHost, {
  transports: ['websocket'],
  path: '/socket'
})

export default ({ app }) => {
  const socket = io(socketHost, {
    transports: ['websocket'],
    path: '/socket'
  })

  socket.on('connect', socket => {
    console.log('socket connect')
  })

  socket.on('barrage-last-list', data => {
    console.log('barrage-last-list')
    const store = app.store
    store.commit('user/SET_BARRAGES', data)
  })
}

export { socketIO }
