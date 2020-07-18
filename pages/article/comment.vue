<!--评论模块-->
<template>
  <div class="container-commont">

    <div class="title">
      评论列表
    </div>

    <!-- 评论输入框 -->
    <div class="comment-form">
      <div class="input-comment">
        <el-input
          v-model="comment.content"
          :autosize="{ minRows: 6, maxRows: 10}"
          type="textarea"
          placeholder="说点什么" />

        <div class="action-box">
          <el-avatar :src="comment.avatar" class="avatar" size="small"/>
          <div class="emoji emoji-btn">
            <div class="emoji-box">
              <i class="iconfont icon-emoji"/>
              <span data-v-1a162112="">表情</span>
            </div>
          </div>
          <el-input v-model="comment.userId" maxlength="10" placeholder="QQ号" size="mini" style="width: 20%;padding-left: 20px;border-radius: 23px;" @blur="onQQBlur(true)"/>
          <div class="submit">
            <input type="button" value="" style="background-color: #1b54bc;" @click="commitComment(comment)">
          </div>
        </div>
      </div>
    </div>

    <div class="shane-comment-title" style="border-bottom: 2px solid #1b54bc;">
      <li class="" style="float: left;list-style-type:none;">全部评论（<span class="comment-count">{{ comments.length }}</span>）</li>
    </div>

    <!-- 评论列表 -->
    <div v-for="item in comments" :key="item.id" class="comment">
      <div class="info">
        <img :src="item.avatar" class="avatar" width="36" height="36">
        <div class="right">
          <div class="name">{{ item.userName }}</div>
          <div class="createAt">{{ item.createAt | timestampToTime }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <span :class="{active: isUpvote(item)}" class="like" @click="likeClick(item)">
          <i class="iconfont icon-like"/>
          <span class="like-num">{{ item.upvote > 0 ? item.upvote + '人赞' : '赞' }}</span>
        </span>
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"/>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div v-for="reply in item.reply" :key="reply.id" class="item">
          <div class="reply-content">
            <span class="from-name">{{ reply.userName }}</span><span>: </span>
            <span class="to-name">@{{ reply.toName }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.createAt }}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"/>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div v-if="item.reply && item.reply.length > 0" class="write-reply" @click="showCommentInput(item)">
          <i class="el-icon-edit"/>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade" >
          <div v-if="showItemId === item.id" v-show="commentAction" class="input-wrapper">

            <!-- 评论输入框 -->
            <div class="comment-form">
              <div class="input-comment">
                <el-input
                  v-model="replyComment.content"
                  :autosize="{ minRows: 6, maxRows: 10}"
                  :placeholder=" '@' + replyComment.toName "
                  type="textarea"/>

                <div class="action-box">
                  <el-avatar :src="replyComment.avatar" class="avatar" size="small"/>
                  <div class="emoji emoji-btn">
                    <div class="emoji-box">
                      <i class="iconfont icon-emoji"/>
                      <span data-v-1a162112="">表情</span>
                    </div>
                  </div>
                  <el-input v-model="replyComment.userId" maxlength="10" placeholder="QQ号" size="mini" style="width: 20%;padding-left: 20px;border-radius: 23px;" @blur="onQQBlur(false)"/>
                  <div class="submit">
                    <input type="button" value="" style="background-color: #1b54bc;" @click="commitComment(replyComment)">
                  </div>
                </div>
              </div>
            </div>

          </div>
        </transition>
      </div>
    </div>

    <div v-if="comments && comments.length <= 0" class="empty-list">
      <span class="prompt-null-w">还没有评论，快来抢沙发吧！</span>
    </div>

  </div>
</template>

<script>
import { isBrowser } from '~/environment/esm'
import { timestampToTime } from '@/utils/date'

export default {
  components: {},
  filters: {
    timestampToTime(val) {
      return timestampToTime(val)
    }
  },
  props: {
    comments: {
      type: Array,
      required: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comment: {
        articleId: this.articleId,
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userId: '',
        userName: '',
        captcha: '',
        content: '',
        parentId: '',
        toId: '',
        toAvatar: '',
        toName: ''
      },
      replyComment: null,
      commentAction: false,
      showItemId: ''
    }
  },
  created() {
    this.replyComment = Object.assign({}, this.comment)
  },
  mounted() {
    // 实现 commentAction div以外的元素隐藏自身
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.commentAction = false
      }
    })
  },
  methods: {
    onQQBlur(flag) {
      if (flag) {
        this.$store.dispatch('comment/findUserInfo', this.comment.userId).then(response => {
          if (response.code === 20000 && response.data.code === 1) {
            this.comment.avatar = response.data.qlogo
            this.comment.userName = response.data.name
          } else {
            this.$toast.info(response.message)
            this.comment.avatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            this.comment.userName = ''
          }
        })
      } else {
        this.$store.dispatch('comment/findUserInfo', this.replyComment.userId).then(response => {
          if (response.code === 20000 && response.data.code === 1) {
            this.replyComment.avatar = response.data.qlogo
            this.replyComment.userName = response.data.name
          } else {
            this.$toast.info(response.message)
            this.replyComment.avatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            this.replyComment.userName = ''
          }
        })
      }
    },
    isUpvote(item) {
      if (isBrowser) {
        return localStorage.getItem(`article_${this.articleId}_common_${item.id}`)
      }
    },
    /**
       * 点赞
       */
    likeClick(item) {
      const isUpvote = localStorage.getItem(`article_${this.articleId}common_${item.id}`)
      if (isUpvote) {
        this.$store.dispatch('comment/unLike', item, this.articleId)
      } else {
        this.$store.dispatch('comment/like', item, this.articleId)
      }
    },

    /**
       * 提交评论
       */
    commitComment(item) {
      if (!item.content) {
        this.$toast.info('说点什么吧~~')
        return
      }
      if (!item.userId) {
        this.$toast.info('还没输入QQ号啊，亲~~')
        return
      }
      this.$store.dispatch('comment/postComment', item).then(() => {
        this.$store.dispatch('comment/fetchList', { 'article_id': this.articleId })
        this.commentAction = !this.commentAction
        this.comment.content = ''
        this.replyComment.content = ''
      })
    },

    /**
       * 点击评论按钮显示输入框
       * item: 当前大评论
       * reply: 当前回复的评论
       */
    showCommentInput(item, reply) {
      if (reply) {
        this.replyComment.toName = reply.userName
        this.replyComment.toId = item.userId
        this.replyComment.toAvatar = reply.avatar
      } else {
        this.replyComment.content = ''
        this.replyComment.toId = item.userId
        this.replyComment.toAvatar = item.avatar
        this.replyComment.toName = item.userName
      }
      this.showItemId = item.id
      this.replyComment.parentId = item.id

      this.commentAction = !this.commentAction
    }
  }
}
</script>

<style scoped lang="scss">
$color-main: #409EFF;
$color-success: #67C23A;
$color-warning: #E6A23C;
$color-danger: #F56C6C;
$color-info: #909399;

$text-main: #303133;
$text-normal: #606266;
$text-minor: #909399;  //次要文字
$text-placeholder: #C0C4CC;
$text-333: #333;

$border-first: #DCDFE6;
$border-second: #E4E7ED;
$border-third: #EBEEF5;
$border-fourth: #F2F6FC;

$content-bg-color: #fff;
  .container-commont {
    padding: 1em;
    margin-bottom: 1em;
    background-color: var(--module-bg);
    box-sizing: border-box;

    .title{
      position: relative;
      height: 45px;
      line-height: 35px;
      text-indent: 15px;
      font-size: 16px;
      border-bottom: 1px solid #f6f6f6;
      &:after {
        content: " ";
        position: absolute;
        height: 15px;
        width: 5px;
        background: #1b54bc;
        left: 0;
        top: 10px;
        border-radius: 5px;
      }
    }

    .comment-form {
      position: relative;
      .input-comment {
        display: flex;
        .avatar{
          width:"36";
          height:"36";
          margin-left: 20px;
          border-radius: 50%;
        }
      }
      .action-box{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 13px;
        width: 100%;
        .emoji-box{
          margin-left: 20px;
          color: #027fff;
        }
      }
      .submit{
        input {
          cursor: pointer;
          width: 60px;
          height: 60px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          font-size: 16px;
          border: 0;
          position: absolute;
          right: 24px;
          bottom: -22px;
          background: #6584ff url(/images/svg/release.svg) center no-repeat!important;
          border-radius: 37px;
          background-size: 30px!important;
          transition: .3s;
        }
        margin-left: auto;
        span{
          color: #c2c2c2;
          margin-right: 8px;
          font-size: 13px;
        }
      }

    }
    .comment {
      flex-direction: column;
      padding: 2em 1em 0em 1em;
      border-bottom: 1px solid $border-fourth;
      .info {
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
        }
        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .name {
            font-size: 16px;
            color: $text-main;
            margin-bottom: 5px;
            font-weight: 500;
          }
          .createAt {
            font-size: 12px;
            color: $text-minor;
          }
        }
      }
      .content {
        font-size: 16px;
        color: $text-main;
        line-height: 20px;
        padding: 10px 0;
      }
      .control {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        .like {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          &.active, &:hover {
            color: $color-main;
          }
          .iconfont {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .comment-reply {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            color: $text-333;
          }
          .iconfont {
            font-size: 16px;
            margin-right: 5px;
          }
        }

      }
      .reply {
        margin: 10px 0;
        border-left: 2px solid $border-first;
        .item {
          margin: 0 10px;
          padding: 10px 0;
          //border-bottom: 1px dashed $border-third;
          .reply-content {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: $text-main;
            .from-name {
              color: $color-main;
            }
            .to-name {
              color: $color-main;
              margin-left: 5px;
              margin-right: 5px;
            }
          }
          .reply-bottom {
            display: flex;
            align-items: center;
            margin-top: 6px;
            font-size: 12px;
            color: $text-minor;
            .reply-text {
              display: flex;
              align-items: center;
              margin-left: 10px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
              .icon-comment {
                margin-right: 5px;
              }
            }
          }
        }
        .write-reply {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-minor;
          padding: 10px;
          cursor: pointer;
          &:hover {
            color: $text-main;
          }
          .el-icon-edit {
            margin-right: 5px;
          }
        }
        .fade-enter-active, fade-leave-active {
          transition: opacity 0.5s;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }
        .input-wrapper {
          padding: 10px;
          .gray-bg-input, .el-input__inner {
            /*background-color: #67C23A;*/
          }
          .btn-control {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-top: 10px;
            .cancel {
              color: $text-normal;
              margin-right: 20px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
            }
            .confirm {
              font-size: 16px;
            }
          }
        }
      }
    }

    .empty-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      text-align: center;
      height: 12em;
      opacity: .5;
      .span {
        line-height: 30px;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    }
  }

</style>

<style lang="scss">
.container-commont{
  .el-textarea__inner{
    resize:none;
    border:none;
    background: #f0f0f0;
  }
  .el-input__inner{
    padding: 10px;
    border-radius: 30px;
    height: 30px;
  }
}

.shane-comment-title {
  margin-top: 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #39a7e4;
  color: #333;
  font-size: 14px;
}
</style>
