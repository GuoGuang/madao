/**
 * @file socket 服务 / ES module
 * @module plugins/socket.io
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import io from 'socket.io-client'
import { socketHost } from '~/config/api.config.esm'

const socket = io(socketHost, {
  transports: ['websocket'],
  path: '/socket'
})

export default socket
