<!--评论模块-->
<template>
  <div class="container-commont">

    <!-- 评论输入框 -->
    <div class="comment-form">
      <div class="input-comment">
        <img src="http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg" width="36" height="36" data-v-524b37dd="">
        <el-input v-model="comment" placeholder="说点什么"/>
      </div>
      <div class="action-box">
        <div class="emoji emoji-btn">
          <div class="emoji-box">
            <i class="iconfont icon-biaoqing"/>
            <span data-v-1a162112="">表情</span>
          </div>
        </div>
        <!--  <div class="image-btn">
          <span >图片</span>
        </div> -->
        <div class="submit">
          <span >Ctrl or ⌘ + Enter</span><el-button type="primary" size="small">评论</el-button>
        </div>
      </div>

    </div>

    <!-- 评论列表 -->
    <div v-for="item in comments" :key="item.id" class="comment">
      <div class="info">
        <img :src="item.avatar" class="avatar" width="36" height="36">
        <div class="right">
          <div class="name">{{ item.userName }}</div>
          <div class="createAt">{{ item.createAt }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <span :class="{active: item.isLike}" class="like" @click="likeClick(item)">
          <i class="iconfont icon-like"/>
          <span class="like-num">{{ item.likeNum > 0 ? item.likeNum + '人赞' : '赞' }}</span>
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
        <div v-if="item.reply.length > 0" class="write-reply" @click="showCommentInput(item)">
          <i class="el-icon-edit"/>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div v-if="showItemId === item.id" class="input-wrapper">
            <el-input
              v-model="inputComment"
              :rows="3"
              class="gray-bg-input"
              type="textarea"
              autofocus
              placeholder="写下你的评论"/>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  components: {},
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      comment: '',
      inputComment: '',
      showItemId: ''
    }
  },
  computed: {},
  created() {

  },
  methods: {
    /**
       * 点赞
       */
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, 'isLike', true)
        this.$emit('is-like', true)
        item.likeNum++
      } else {
        if (item.isLike) {
          this.$emit('is-like', false)
          item.likeNum--
        } else {
          item.likeNum++
          this.$emit('is-like', true)
        }
        item.isLike = !item.isLike
      }
    },

    /**
       * 点击取消按钮
       */
    cancel() {
      this.showItemId = ''
    },

    /**
       * 提交评论
       */
    commitComment() {
      this.$emit('commit-comment', this.inputComment)
    },

    /**
       * 点击评论按钮显示输入框
       * item: 当前大评论
       * reply: 当前回复的评论
       */
    showCommentInput(item, reply) {
      if (reply) {
        this.inputComment = '@' + reply.userName + ' '
      } else {
        this.inputComment = ''
      }
      this.showItemId = item.id
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
    .comment-form{
      padding: 1em;
      background-color: #eeeeee;
      .input-comment{
        display: flex;
        img{
          margin-right: 10px;
          border-radius: 50%;
        }
      }
      .action-box{
        display: flex;
        align-items: center;
        margin: .65rem 0 0 4em;
        .emoji-box{
          color: #027fff;
        }
      }
      .submit{
        margin-left: auto;
        span{
          color: #c2c2c2;
          margin-right: 8px;
          font-size: 13px;
        }
      }

    }
    .comment {
      display: flex;
      flex-direction: column;
      padding: 1em 1em 1em 4em;
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
              font-size: 16px;
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
  }
</style>
