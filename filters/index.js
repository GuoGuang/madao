/**
 * @file Filters / ES module
 * @module filters/index
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import { textOverflow, firstUpperCase } from './html-filter.js'
import { timeAgo, toYMD, toLocalString } from './time-filter.js'

export default {
  textOverflow,
  firstUpperCase,
  timeAgo,
  toYMD,
  toLocalString
}
