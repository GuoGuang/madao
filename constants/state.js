/**
 * @file State constant / Commonjs module
 * @module state.constant
 * @author GuoGuang <https://github.com/GuoGuang>
 */

// 转载状态
exports.OriginState = {
  Original: 1, // 原创
  Reprint: 2, // 转载
  Hybrid: 3 // 混合
}

// 评论宿主页面的 POST_ID 类型
exports.CommentPostType = {
  Guestbook: 0 // 留言板
}

// 评论本身的类型
exports.CommentParentType = {
  Self: 0 // 自身一级评论
}

// 排序状态
exports.SortType = {
  Asc: 1, // 升序
  Desc: -1, // 降序
  Hot: 2 // 热序
}

