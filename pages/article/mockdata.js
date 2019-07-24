// 模拟评论数据
const comment = {
  status: '成功',
  code: 200,
  data: [
    {
      id: 'comment0001', // 主键id
      createAt: '2018-07-05 08:30', // 评论时间
      tweetsId: 'talents100020', // 吐槽的id
      userId: 'errhefe232213', // 评论者id
      userName: '犀利的评论家', // 评论者昵称
      avatar: 'https://images.nowcoder.com/images/20180218/6617757_1518920311404_48DBFD0E780C1F7DCB9ABC4D5083B2BD@0e_100w_100h_0c_1i_1o_90Q_1x', // 评论者头像
      likeNum: 3, // 点赞人数
      content: '非常靠谱的程序员', // 评论内容
      reply: [ // 回复，或子评论
        {
          id: '34523244545', // 主键id
          commentId: 'comment0001', // 父评论id，即父亲的id
          userId: 'observer223432', // 评论者id
          userName: '夕阳红', // 评论者昵称
          avatar: 'https://user-gold-cdn.xitu.io/2019/3/4/16947f5e8bd5719f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1', // 评论者头像
          toId: 'errhefe232213', // 被评论者id
          toName: '犀利的评论家', // 被评论者昵称
          toAvatar: 'https://images.nowcoder.com/images/20180218/6617757_1518920311404_48DBFD0E780C1F7DCB9ABC4D5083B2BD@0e_100w_100h_0c_1i_1o_90Q_1x', // 被评论者头像
          content: '赞同，很靠谱，水平很高', // 评论内容
          createAt: '2018-07-05 08:35' // 评论时间
        },
        {
          id: '34523244546',
          commentId: 'comment0001',
          userId: 'observer567422',
          userName: '清晨一缕阳光',
          avatar: 'http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg',
          toId: 'observer223432',
          toName: '夕阳红',
          toAvatar: 'https://user-gold-cdn.xitu.io/2019/3/4/16947f5e8bd5719f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
          content: '大神一个！',
          createAt: '2018-07-05 08:50'
        }
      ]
    },
    {
      id: 'comment0002',
      createAt: '2018-07-05 08:30',
      tweetsId: 'talents100020',
      userId: 'errhefe232213',
      userName: '毒蛇郭德纲',
      avatar: 'https://images.nowcoder.com/images/20180102/63_1514861814371_E573EC9DA05DFAC7340D94F1A6D246E3@0e_100w_100h_0c_1i_1o_90Q_1x',
      likeNum: 0,
      content: '从没见过这么优秀的人',
      reply: []
    }
  ]
}
export { comment }
