/**
 * @file 懒加载 / ES module
 * @module plugins/lozad
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import lozad from 'lozad'
import { isBrowser } from '~/environment/esm'

if (isBrowser) {
  window.lozad = lozad
}

export default lozad

