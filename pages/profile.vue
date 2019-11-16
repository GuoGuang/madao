<template>
  <!-- 用户页面 -->
  <div class="profile">
    <el-row class="profile-user-info">
      <el-col :span="4">
        <div class="profile__heading--avatar-warp">
          <a href="/u/guoguang0536">
            <img
              class="image"
              src="https://avatar-static.segmentfault.com/971/470/97147086-59b9044e77b75_huge256"
              alt="GuoGuang0536"
            >
          </a>
          <div class="profile__avatar-uploader">
            <span @click="uploadAvatar">上传头像</span>
          </div>

        </div>
        <input id="avatarFile" ref="avatarFile" type="file" name="avatar" class="hide" @change="changeAvatar">
        <div class="profile__heading--social">
          <ul class="profile__heading--social-inline">
            <li>
              <a class="opacity25 icon-sn-google" target="_blank" href="/user/oauth/google">google</a>
            </li>
            <li>
              <a href="https://github.com/Lin-GG" class="icon-sn-github" target="_blank">qq</a>
            </li>
            <li>
              <a href="http://weibo.com/3303257711" class="icon-sn-weibo" target="_blank">github</a>
            </li>
            <li>
              <a
                class="opacity25 icon-sn-linkedin"
                target="_blank"
                href="/user/oauth/linkedin"
              >twitter</a>
            </li>
            <li>
              <a class="opacity25 icon-sn-twitter" target="_blank" href="/user/oauth/twitter">weibo</a>
            </li>
            <li>
              <a class="opacity25 icon-sn-facebook" target="_blank" href="/user/oauth/facebook"/>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="9" class="profile-info">
        <h2 class="profile__heading--name">
          GuoGuang0536
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
              <span class="profile__heading-edit btn btn-xs" data-type="city">
                <i class="fa fa-pencil" aria-hidden="true"/>编辑
              </span>
            </span>
          </span>
          <span style="margin: 7px;" class="profile__heading--other-item">
            <i class="fa fa-graduation-cap" aria-hidden="true"/>
            <span class="profile__school">
              山东大学
              <span class="profile__heading--other-item-fgx">&nbsp;&nbsp;|&nbsp;&nbsp;</span>计算机
              <span class="profile__heading-edit btn btn-xs" data-type="school">
                <i class="fa fa-pencil" aria-hidden="true"/>编辑
              </span>
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
              >
                <i class="fa fa-pencil" aria-hidden="true"/>编辑
              </span>
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
              <span class="profile__heading-edit">
                <i class="fa fa-pencil" aria-hidden="true"/>编辑
              </span>
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
  </div>
</template>

<script>
export default {
  name: 'Profile',
  head() {
    return {
      // title: `${this.isEnLang ? '' : this.$i18n.nav.project + ' | '}的个人主页`
      title: `${this.isEnLang ? '' : ' GuoGuang| '}的个人主页`
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
.profile {
  .profile-user-info{
    padding-top: 2em;
  }
  .hide{
    display: none
  }
  .profile-info{
    padding-left: 2em;
  }
  .line-height {
    line-height: 32px;
  }

  .profile__heading--avatar-warp {
        position: relative;
    border-radius: 50%;
    overflow: hidden;
    .image {
      width: 180px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .profile__avatar-uploader{
    display: none;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    width: 174px;
    text-align: center;
    background: rgba(0,0,0,0.75);
    height: 38px;
    color: #fff;
    line-height: 41px;
    }
  }

.profile__heading--avatar-warp:hover .profile__avatar-uploader {
    display: block
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
      background-color: #cecece;
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
</style>
