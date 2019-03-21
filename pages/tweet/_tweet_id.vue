<template>
  <!-- 吐槽详情页 -->
  <el-row class="tweet-detail">
    <el-col :span="4">&nbsp;</el-col>

    <el-col :span="14" class="tweets">
      <div class="item-content">
        <el-row type="flex" class="account-group">
          <el-col :span="3" class="account-image">
            <img
              class="user-profile"
              src="https://user-gold-cdn.xitu.io/2019/2/26/169268d0793ad9be?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
            >
          </el-col>
          <el-col :span="7">
            <div class>
              <div>昵称</div>
              <div style="color: #8a9aa9;">摸鱼打杂·1小时前</div>
            </div>
          </el-col>
          <el-col :span="14">
            <div class style="float: right;">
              <el-button size="mini" round>关注</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="content">
              🎉🎉🎉
              终于可以告别臃肿的 Expo 了，
              官方将 SDK 拆分成了多个包，
              可以只添加用到的依赖了。
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="content">
              <img
                style="width: 40%;"
                src="https://user-gold-cdn.xitu.io/2019/3/1/169387db4349d2eb?imageView2/1/w/460/h/316/q/85/format/jpg/interlace/1"
              >
            </div>
          </el-col>
        </el-row>
        <el-row class="action-box">
          <el-col :span="8">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#youyd-icon-caozuo-dianzan"/>
            </svg>
            <a>0</a>
          </el-col>
          <el-col :span="8" class="action-box-center">
            <nuxt-link to="/tweet/1" text>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#youyd-icon-pinglun"/>
              </svg>
            </nuxt-link>0
          </el-col>
          <el-col :span="8">
            <svg class="icon" aria-hidden="true" style="padding-bottom: 8px;">
              <use xlink:href="#youyd-icon-fenxiang"/>
            </svg>
            分享
          </el-col>
        </el-row>

        <!-- 添加评论区 -->
        <div class="comment-form">
          <el-row style="display: flex;">
            <el-col :span="2" class>
              <img
                class="user-profile"
                style="width: 35px;
              height: 35px;
              border-radius: 50%;
              align-items: center;
              justify-content: center;
              overflow: hidden;"
                src="https://user-gold-cdn.xitu.io/2019/2/26/169268d0793ad9be?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
              >
            </el-col>
            <el-input placeholder="输入评论" style="padding: 5px;"/>
          </el-row>

          <el-row class="ext-btn">
            <el-col :span="12" style="    padding-left: 23px;">
              <ul>
                <li>
                  <a style="color:#007fff" href="#">表情</a>
                </li>
                <li>
                  <a style="color:#007fff" href="#">图片</a>
                </li>
                <li>
                  <a style="color:#007fff" href="#">链接</a>
                </li>
                <li>
                  <a style="color:#007fff" href="#">#话题</a>
                </li>
              </ul>
            </el-col>
            <el-col :span="9" class="tips">
              <span>Ctrl or ⌘ + Enter</span>
            </el-col>
            <el-col :span="3">
              <div class>
                <el-button type="primary" style="float:right" size="small">评论</el-button>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 评论列表 -->
        <div v-for="(comment, index) in comments" :key="index" class="comments-list">
          <el-row type="flex" class="account-comment-group">
            <el-col :span="3" class="account-image content">
              <img
                class="user-profile"
                src="https://user-gold-cdn.xitu.io/2019/2/26/169268d0793ad9be?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
              >
            </el-col>
            <el-col :span="7">
              <div class>
                <div>昵称</div>
                <div style="color: #8a9aa9;">摸鱼打杂·1小时前</div>
              </div>
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 1.333rem;border-bottom: 1px solid #f1f1f1; ">
            <el-col :span="24" style="margin-bottom: 1em;">
              <div class="content" style="margin: 0 2em 0 7em;">
                🎉🎉🎉
                终于可以告别臃肿的 Expo 了，
                官方将 SDK 拆分成了多个包，
                可以只添加用到的依赖了。 终于可以告别臃肿的 Expo 了，
                官方将 SDK 拆分成了多个包，
                可以只添加用到的依赖了。 终于可以告别臃肿的 Expo 了，
                官方将 SDK 拆分成了多个包，
                可以只添加用到的依赖了。 终于可以告别臃肿的 Expo 了，
                官方将 SDK 拆分成了多个包，
                可以只添加用到的依赖了。 终于可以告别臃肿的 Expo 了，
                官方将 SDK 拆分成了多个包，
                可以只添加用到的依赖了。
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>

    <el-col :span="6">&nbsp;</el-col>
  </el-row>
</template>

<script>
// import { mapState } from 'vuex'
// import { isBrowser } from '~/environment/esm'
// import lozad from '~/plugins/lozad'
// import marked from '~/plugins/marked'
// import adConfig from '~/config/ad.config'
import ShareBox from '~/components/widget/share'
export default {
  name: 'TweetDetail',
  components: {
    ShareBox
  },
  fetch({ store }) {
    return store.dispatch('events/fetchEvents')
  },
  computed: {
    comments() {
      return this.$store.state.events.events.data
    },
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet-detail {
  .tweets {
    .item-content {
      margin-bottom: 1em;
      background-color: #fff;

      > .account-group {
        padding: 1em 0 0;

        > .account-image {
          width: 10.5%;

          > .user-profile {
            width: 51px;
            height: 51px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
        }
      }

      .content {
        font-size: 15px;
        margin: 0 2em 0 4em;
      }

      > .action-box {
        text-align: center;
        border-top: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;

        > svg {
          padding-bottom: 8px;
        }

        .icon {
          height: 30px;
          width: 20px;
        }

        > .action-box-center {
          border-right: 2px solid #ebebeb;
          border-left: 2px solid #ebebeb;
        }
      }

      padding-left: 1em;
      .ext-btn {
        ul {
          display: flex;
          padding-top: 9px;
          justify-content: space-evenly;
          list-style: none;
        }

        .tips {
          padding-top: 9px;

          > span {
            float: right;
            color: #c2c2c2;
          }
        }
      }
      .comment-form {
        margin: 1.333rem;
        margin-left: 0;
        padding: 1rem 1.333rem;
        background-color: #fafbfc;
      }
    }

    .comments-list {
      margin-bottom: 1em;
      background-color: #fff;
      .account-comment-group {
        > .account-image {
          width: 2.5%;
          > .user-profile {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
        }
      }
      > .account-group {
        padding: 1em 0 0;

        > .account-image {
          width: 10.5%;

          > .user-profile {
            width: 51px;
            height: 51px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
        }
      }

      .content {
        font-size: 15px;
        margin: 0 2em 0 4em;
      }
    }
  }
}
</style>
