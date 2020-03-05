
<template>
  <!-- 个人中心 -->
  <div class="user">
    <el-row class="user-info">
      <el-col :span="4" style="padding-top: 1em;">
        <div class="profile__heading--avatar-warp">
          <a href="/u/GuoGuang">
            <img
              class="image"
              src="https://avatar-static.segmentfault.com/971/470/97147086-59b9044e77b75_huge256"
              alt="GuoGuang"
            >
          </a>
          <div class="profile__avatar-uploader">
            <span @click="uploadAvatar">上传头像</span>
          </div>

        </div>
        <input id="avatarFile" ref="avatarFile" type="file" name="avatar" class="hide" @change="changeAvatar">

      </el-col>
      <el-col :span="9" style="padding-top: 1em;" class="profile-info">
        <h2 class="profile__heading--name">
          GuoGuang
          <small class="ml15">
            <a href="/u/GuoGuang/about">查看完整档案</a>
          </small>
        </h2>
        <div style="margin: 7px;" class="profile__heading--award">
          <a class="profile__rank-btn" href="/u/GuoGuang/rank">
            <img src="/images/svg/rp.svg">
            <span class="h4">0</span>
            <span class="profile__rank-btn-text">声望</span>
          </a>
        </div>
        <div class="profile__heading--other" style="display:flex;flex-direction: column;">
          <span style="margin: 7px;" class="profile__heading--other-item">
            <i class="fa fa-map-marker"/>
            <span class="profile__city">
              潍坊
              <span class="profile__heading-edit btn btn-xs" data-type="city"/>
            </span>
          </span>
          <span style="margin: 7px;" class="profile__heading--other-item">
            <i class="fa fa-graduation-cap" aria-hidden="true"/>
            <span class="profile__school">
              山东大学
              <span class="profile__heading--other-item-fgx">&nbsp;&nbsp;|&nbsp;&nbsp;</span>计算机
              <span class="profile__heading-edit btn btn-xs" data-type="school"/>
            </span>
          </span>
          <span style="margin: 7px;" class="profile__heading--other-item">
            <i class="fa fa-briefcase" aria-hidden="true"/>
            <span class="profile__company">
              山东
              <span class="profile__heading--other-item-fgx">&nbsp;&nbsp;|&nbsp;&nbsp;</span>java工程师
              <span
                style="margin: 7px;"
                class="profile__heading-edit btn btn-xs"
                data-type="company"
              />
            </span>
          </span>
          <span style="margin: 7px;" class="profile__heading--other-item">
            <i class="fa fa-link"/>
            <span class="profile__site">
              <a class="profile__heading--other-item-link" target="_blank" href="http://"/>
              <span
                class="profile__heading-edit btn btn-xs profile__heading-edit--init"
                data-type="site"
              >
                <i class="fa fa-pencil hide" aria-hidden="true"/>填写个人主网站
              </span>
            </span>
          </span>
        </div>
      </el-col>

      <el-col :span="11">
        <div class="profile__heading--desc">
          <div class="profile__heading--desc-heading">
            <span class="profile__heading--desc-heading-dot-warp">
              <span class="profile__heading-dot profile__heading-dot--red"/>
              <span class="profile__heading-dot profile__heading-dot--yellow"/>
              <span class="profile__heading-dot profile__heading-dot--green"/>
            </span>
            <div class="pull-right line-height">
              <span class="profile__heading-edit"/>
            </div>
          </div>

          <div class="profile__heading--desc-body">
            <div class="profile__desc">
              <p>不积跬步无以至千里,不积小流无以成江海;</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="user-cricle" style="padding-top: 2em;">
      <el-tabs v-model="activeName" type="card" tab-position="left" @tab-click="handleTabClick">
        <el-tab-pane :disabled="true" label="我的互动" name="0"/>
        <el-tab-pane name="1">
          <span slot="label"><i class="el-icon-thumb"/> 我的点赞</span>
          <div class="padding-main my-thumb">
            <h1 class="h1"> <i class="el-icon-thumb"/>  shenjinwa_ 赞过的内容（1）</h1>
            <div class="divider"/>

            <div class="content">
              <el-link href="https://element.eleme.io" target="_blank" class="title">Laravel 队列实战教程：构建一个简单的统计应用</el-link>
              <div class="meta">
                <p>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">创建于 1个月前 </el-link>

                  <span class="vertical-bar">|</span>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">阅读数 1693  </el-link>

                  <span class="vertical-bar">|</span>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">评论数 24 </el-link>
                </p>
              </div>
            </div>

            <div class="content">
              <el-link href="https://element.eleme.io" target="_blank" class="title">Laravel 队列实战教程：构建一个简单的统计应用</el-link>
              <div class="meta">
                <p>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">创建于 1个月前 </el-link>|
                  <el-link href="https://element.eleme.io" type="info" target="_blank">阅读数 1693  </el-link> |
                  <el-link href="https://element.eleme.io" type="info" target="_blank">评论数 24 </el-link>
                </p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label"><i class="el-icon-chat-round"/> 我的回复</span>
          <div class="padding-main my-thumb">
            <h1 class="h1"> <i class="el-icon-square"/>  shenjinwa_ 赞过的内容（1）</h1>
            <div class="divider"/>

            <div class="content">
              <el-link href="https://element.eleme.io" target="_blank" class="title">Laravel 队列实战教程：构建一个简单的统计应用</el-link>
              <div class="meta">
                <p>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">创建于 1个月前 </el-link>
                  <span class="vertical-bar">|</span>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">阅读数 1693  </el-link>
                  <span class="vertical-bar">|</span>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">评论数 24 </el-link>
                </p>
              </div>
            </div>

            <div class="content">
              <el-link href="https://element.eleme.io" target="_blank" class="title">Laravel 队列实战教程：构建一个简单的统计应用</el-link>
              <div class="meta">
                <p>
                  <el-link href="https://element.eleme.io" type="info" target="_blank">创建于 1个月前 </el-link>|
                  <el-link href="https://element.eleme.io" type="info" target="_blank">阅读数 1693  </el-link> |
                  <el-link href="https://element.eleme.io" type="info" target="_blank">评论数 24 </el-link>
                </p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label"><i class="el-icon-thumb"/> 我的收藏</span>
          <div class="padding-main phone"/>
        </el-tab-pane>
      </el-tabs>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'User',
  head() {
    return {
      title: `${this.isEnLang ? '' : ' GuoGuang| '}的个人主页`
    }
  },
  data() {
    return {
      activeName: '1'
    }
  },
  fetch({ store }) {
    return store.dispatch('project/fetchRepositories')
  },
  computed: {
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    },
    projects() {
      return this.$store.state.project.repositories.data
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    uploadAvatar() {
      this.$refs['avatarFile'].click()
    },
    changeAvatar() {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<strong>上传成功</strong>',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  .user-info {
    background: #f8f8f8;
    padding: 2em;
    .hide {
      display: none;
    }
    .profile-info {
      padding-left: 4em;
    }
    .line-height {
      line-height: 32px;
    }
    .profile__heading--avatar-warp {
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      .image {
        width: 167px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .profile__avatar-uploader {
        display: none;
        cursor: pointer;
        position: absolute;
        bottom: 0;
        width: 174px;
        text-align: center;
        background: rgba(0, 0, 0, 0.75);
        height: 38px;
        color: #f8f8f8;
        line-height: 41px;
      }
    }

    .profile__heading--avatar-warp:hover .profile__avatar-uploader {
      display: block;
    }
    .profile__heading--social {
      .profile__heading--social-inline {
        list-style: none;

        display: flex;
        justify-content: space-between;
      }
    }
    .profile__heading--desc {
      .profile__heading--desc-heading {
        height: 32px;
        background-color: #e3e3e3;
        padding: 0 12px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        .profile__heading-edit {
          color: #999;
        }
        .profile__heading--desc-heading-dot-warp {
          line-height: 32px;
        }
        .profile__heading-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #eee;
          margin-right: 8px;
        }
        .profile__heading-dot--red {
          background-color: #ff5f57;
        }

        .profile__heading-dot--yellow {
          background-color: #ffbd2e;
        }

        .profile__heading-dot--green {
          background-color: #28ca42;
        }
      }
      .profile__heading--desc-body {
        background-color: #eeeeee;
        width: 100%;
        font-size: 13px;
        color: #666666;
        overflow: auto;
        height: 196px;
        padding: 20px;
        font-family: 'Source Code Pro', Consolas, Menlo, Monaco, 'Courier New',
          monospace;
      }
    }
  }
  .user-cricle {
    .divider {
      border-top: 1px solid #d3e0e9;
      border-bottom: 1px solid rgba(211, 224, 233, 0.15);
    }

    .my-thumb {
      background: #f8f8f8;
      padding: 1em;
      padding-left: 2em;
      border: 1px solid #d3e0e9;
      border-radius: 0.28571429rem;
      border: 1px solid rgba(34, 36, 38, 0.15);
      .content {
        border-bottom: 1px dashed #dae1ea;
        margin: 2em 0;
        .title {
          line-height: 26px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.67);
        }
        .title::after {
          border-bottom-color: rgba(0, 0, 0, 0.67);
        }
        .meta {
          line-height: 34px;
          .vertical-bar {
            margin: 0 4px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.user-cricle {
  .el-tabs__header {
    background: #f8f8f8;
  }
  .el-tabs__content {
    padding: 0 0 2em 2em;
  }
  .el-tabs--left {
    .el-tabs__nav {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      flex-direction: column;
      display: flex;
      width: 15em;
      transform: translateY(0px);
      .el-tabs__item:hover {
        color: #303133;
      }
    }
  }

  .el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active {
    border-right-color: #d3e0e9 !important;
    color: #303133 !important;
    background: rgba(0, 0, 0, 0.05);
  }
}
</style>
