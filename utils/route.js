/**
 * @file 路径判定器 / ES module
 * @module utils/route
 * @author GuoGuang <https://github.com/GuoGuang0536>
 */

import systemConstants from '~/constants/system'

export const isIndexRoute = name => name === systemConstants.Route.Index
export const isArticleDetailRoute = name => name === systemConstants.Route.ArticleDetail
export const isSearchArchiveRoute = name => name === systemConstants.Route.SearchArchive
export const isGuestbookRoute = name => name === systemConstants.Route.Guestbook
export const isServiceRoute = name => name === systemConstants.Route.Service
export const isAppRoute = name => name === systemConstants.Route.App

