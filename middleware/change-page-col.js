/**
 * @file 响应布局-中间件 / ES module
 * @module middleware/change-page-col
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import systemConstants from '~/constants/system'

export default ({ route, store }) => {
  const isOneColumns = [
    systemConstants.Route.Music,
    systemConstants.Route.App,
    systemConstants.Route.Service
  ].includes(route.name)

  if (store.state.global.isOneColumns !== isOneColumns) {
    store.commit('global/updateThreeColumnsState', isOneColumns)
  }
}
