<template>
  <!-- 页面头部 -->
  <header id="header" class="header">

    <el-dialog :visible.sync="loginDialogVisible" class="loginDialog" title="登录" width="30%">
      <!-- :model="formLabelAlign" -->
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-position="top" label-width="80px" size="mini">
        <el-form-item label="手机号 或 Email" prop="account">
          <el-input v-model="loginForm.account" placeholder="11 位手机号 或 Email" size="small"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" size="small"/>
        </el-form-item>

        <el-form-item>
          <a href="#" class="phoneLogin">手机验证码登录</a>
          <a href="#" class="forget">忘记密码</a>
        </el-form-item>

        <el-form-item>
          <el-button size="medium " @click="login('ruleForm')">登录</el-button>
        </el-form-item>

        <div class="more-login-area">
          <span class="more-login-words">更多登录方式</span>
        </div>
      </el-form>
      <div class="widget-login">
        <a href="/user/oauth/google" class="">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#youyd-icon-google"/>
          </svg>
        </a>
        <a href="/user/oauth/qq" class="">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#youyd-icon-qq"/>
          </svg>
        </a>
        <a href="/user/oauth/weixin" class="">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#youyd-icon-weixin"/>
          </svg>
        </a>
      </div>
      <p class="terms">
        登录即表示你同意网站的<a href="/tos" target="_blank">《服务条款》</a>
      </p>
    </el-dialog>

    <el-dialog :visible.sync="registDialogVisible" class="registDialog" title="注册" width="30%">
      <el-form label-position="top" label-width="80px" size="mini">
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号" size="small"/>
        </el-form-item>
        <p class="terms">
          同意<a href="/tos" target="_blank">《用户协议》《隐私政策》</a>
        </p>
        <el-form-item>
          <el-button size="medium " @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <span class="navbar-blank"/>
          <img src="/images/logo.svg" class="navbar-logo">
          <nuxt-link to="/" class="navbar-link" />
        </div>

        <div class="navbar-menu">
          <transition name="module">
            <nav-view />
          </transition>
        </div>

        <div class="navbar-search">
          <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"/>
        </div>

        <!-- 已登录 -->
        <div v-if="loginStatus" class="user-profile">
          <el-menu class="el-menu-demo" mode="horizontal" background-color="#f8f8f8" style="border-bottom: 0;">
            <el-menu-item index="1">私信</el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <img class="image" src="https://images.nowcoder.com/images/20180218/6617757_1518920311404_48DBFD0E780C1F7DCB9ABC4D5083B2BD@0e_100w_100h_0c_1i_1o_90Q_1x">
              </template>
              <el-menu-item index="2-1">
                <div class="profile-hover-info" style="    text-align: left;">

                  <span style="float:left;">GuoGuang</span>

                  <span style="float:right;"> <a
                    href="/profile"
                    class="float:right"
                    style="display: inline-block;
                                                                                            border: 1px solid #25bb9b;
                                                                                            padding: 9px 5px;
                                                                                            font-size: 12px;
                                                                                            float: right;
                                                                                            border-radius: 4px;
                                                                                            color: #25bb9b;
                                                                                            line-height: 1;">个人主页</a></span>
                </div>
              </el-menu-item>
              <el-menu-item index="2-2">账号设置</el-menu-item>
              <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>

        <!-- 未登录 -->
        <div v-else class="navbar-login">
          <a style="color: #009a61;font-size: 14px;" href="#" @click="loginDialogVisible = true">{{ $i18n.nav.login }}</a>
          <div class="item" style="margin-left: 10px !important;">
            <el-button size="small" type="success" @click="registDialogVisible = true">{{ $i18n.nav.register }}</el-button>
          </div>
        </div>

        <!-- 音乐 -->
        <!-- <div class="navbar-player">
          <div class="panel">
            <button class="prev-song btn" @click="prevSong" :disabled="!playerState.ready">
              <i class="iconfont icon-music-prev"></i>
            </button>
            <button class="toggle-play btn" @click="togglePlay" :disabled="!playerState.ready">
              <i class="iconfont" :class="playerState.playing ? 'icon-music-pause' : 'icon-music-play'"></i>
            </button>
            <button class="next-song btn" @click="nextSong" :disabled="!playerState.ready">
              <i class="iconfont icon-music-next"></i>
            </button>
            <button class="muted-toggle btn" @click="toggleMuted" :disabled="!playerState.ready">
              <i class="iconfont" :class="playerState.muted ? 'icon-music-muted' : 'icon-music-volume'"></i>
            </button>
          </div>
          <div class="song" v-if="currentSong">
            <nuxt-link
              to="/music"
              class="link"
              :title="`${currentSong.name} / ${currentSong.album.name || 'unknow'}`"
            >
              <span>{{ currentSong.name }}</span>
              <span>By</span>
              <span :key="index" v-for="(artist, index) in currentSong.artists" v-text="artist.name"></span>
              <span>/</span>
              <span>{{ currentSong.album.name || 'unknow' }}</span>
            </nuxt-link>
          </div>
          <div class="song" v-else>{{ $i18n.text.music.empty }}</div>
        </div> -->

      </div>
      <div class="pre-load">
        <img v-if="preload" :src="currentSongPicUrl" alt="song-thumb">
        <img v-if="preload" src="/images/shang.jpg" alt="shang">
        <img v-if="preload" src="/images/app-hot.png" alt="app-download">
        <img v-if="preload" src="/images/app-logo.png" alt="app-logo">
        <img v-if="preload" src="/images/service.jpg" alt="service">
        <img v-if="preload" src="/images/about-background-be-1.jpg" alt="background">
        <img v-if="preload" src="/images/about-background-be-2.jpg" alt="background">
        <img v-if="preload" src="/images/about-background-star-1.png" alt="background">
        <img v-if="preload" src="/images/about-background-star-2.png" alt="background">
      </div>
    </nav>
  </header>
</template>

<script>
import music from '~/expansions/music'
import { isBrowser } from '~/environment/esm'
import NavView from '~/components/layout/pc/nav'
import { setToken } from '@/utils/auth' // 从cookie中获取token getToken

export default {
  name: 'LayoutHeader',
  components: {
    NavView // 布局
  },
  data() {
    return {
      input: '',
      preload: false,
      loginDialogVisible: false,
      registDialogVisible: false,

      loginForm: {
        id: '',
        acoount: '',
        password: ''

      },

      rules: {
        account: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    loginStatus() {
      console.error('this.$store.state.user.loginStatus')
      console.error(this.$store.state.user.loginStatus)
      return this.$store.state.user.loginStatus
      // return getToken()
    },
    playerState() {
      return music.state
    },
    currentSong() {
      return music.currentSong
    },
    currentSongPicUrl() {
      return music.currentSongPicUrl
    }
  },
  mounted() {
    if (isBrowser) {
      window.addLoadedTask(() => {
        this.preload = true
      })
    }
  },
  methods: {
    login() {
      console.error('this.password')
      console.error(this.password)
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          setToken('5555')
          window.location.reload
          // const postData = Object.assign({}, this.temp)
          /* updateData(postData).then(data => {
              // this.$nextTick(() => {
              //   this.$refs['loginForm'].resetFields()
              // })
              this.$message({
                message: '更新成功',
                type: 'success'
              })
            }) */
        }
      })
    },

    loginDialog() {
      this.loginDialogVisible = true
    },
    togglePlay() {
      music.humanizeOperation(music.player.togglePlay)
    },
    toggleMuted() {
      music.humanizeOperation(music.player.toggleMuted)
    },
    prevSong() {
      music.humanizeOperation(music.player.prevSong)
    },
    nextSong() {
      music.humanizeOperation(music.player.nextSong)
    },
    logout() {

      // this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-button--success {
    color: #fff;
    background-color: #009a61;
    border-color: #008151;
    font-size: 14px;
  }

  .nav-login-btn {
    color: #009a61;
  }

  .header {
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: $header-height;
      background-color: $module-bg;
      z-index: 999;

      .navbar-container {
        height: $header-height;
        display: flex;
        justify-content: space-between;

        .navbar-menu {
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          //width: 43em;
          position: relative;
          overflow: hidden;
        }

        .navbar-search {
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          //width: 43em;
          position: relative;
          overflow: hidden;
        }

        .navbar-login {
          height: $header-height;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-left: .5em;
          width: 15em;
          position: relative;
          overflow: hidden;
          padding: 0;
          margin: 0;
          >.item {
            font-size: 12px;
            border: none;
            display: block;
            height: 3em;
            line-height: 3em;
            padding-left: 1em;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 700;
            border-radius: 1px;
            color: $secondary;
            font-family: webfont-normal, DINRegular;
            letter-spacing: 0.5px;
            margin-bottom: .5em;
            position: relative;

          }
        }

        .user-profile{
          .image{
            width: 36px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
        }
        .navbar-header {
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          // width: 12em;
          position: relative;
          overflow: hidden;

          @keyframes logo-blink {
            0% {
              opacity: 0;
              transform: translateX(-10%);
            }

            5% {
              opacity: 1
            }

            35% {
              opacity: 1
            }

            39% {
              opacity: 0
            }

            50% {
              opacity: .8
            }

            60% {
              opacity: .8
            }

            65% {
              opacity: .8;
              transform: translateX(100%);
            }

            70% {
              opacity: 0;
              transform: translateX(100%);
            }

            100% {
              opacity: 0;
              transform: translateX(100%);
            }
          }

          >.navbar-blank {
            position: absolute;
            top: 0;
            left: 0;
            width: 60%;
            height: 100%;
            opacity: 0;
            animation: logo-blink 8s ease-in 1s infinite;

            &:before {
              content: '';
              width: 11rem;
              height: 3rem;
              position: absolute;
              top: 15%;
              left: 0;
              transform: rotate(-45deg);
              background: radial-gradient(white, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0));
            }
          }

          .navbar-link {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .navbar-logo {
            width: 11rem;
            margin-right: 0;
            filter: $theme-logo-rotate;

            .logo-st {
              fill: $primary;
            }
          }
        }

        .navbar-player {
          width: 13em;
          display: flex;
          flex-direction: column;
          align-items: inherit;
          justify-content: center;
          @include text-overflow();
          opacity: .2;

          &:hover {
            opacity: 1;
          }

          >.panel {
            display: flex;
            justify-content: flex-start;
            margin-bottom: .2rem;

            >.btn {
              margin-right: 1em;

              &:hover {

                >.iconfont {
                  color: $link-hover-color;
                }
              }
            }
          }

          >.song {
            font-size: 1rem;
            @include text-overflow();

            >.link {
              color: $dividers;

              &:hover {
                color: $link-hover-color;
              }
            }
          }

          .iconfont {
            color: $dividers;
          }
        }
      }

      >.pre-load {
        visibility: hidden;
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
  }
</style>

<style lang="scss">
  /* 新启style写入要重写的样式，这个style不要加scoped,解决设置Dialog样式失效问题 */
  .loginDialog {
    .el-dialog {
      margin-top: 5vh !important;
      width: 33%;
    }
    .el-dialog__header {
      border-bottom: 1px solid #e5e5e5;
      text-align: left;
      background-color: #f3f3f3;
    }
    .el-dialog__body {
      padding: 30px 130px;
      .el-form {
        .el-form-item {
          margin-bottom: 10px;
          .phoneLogin {
            color: #009a61;
            text-decoration: none;
          }
          .forget {
            color: #009a61;
            text-decoration: none;
            float: right;
          }
          .el-button {
            width: 100%;
            color: #fff;
            background-color: #009a61;
            border-color: #008151;
          }
        }
        .el-form-item__label {
          font-weight: bold;
          padding: 0 0 0px;
          line-height: 30px;
        }
        .more-login-area {
          margin-top: 30px;
          margin-bottom: 25px;
          border-bottom: 1px solid #eee;
          position: relative;

          .more-login-words {
            position: relative;
            position: absolute;
            left: calc(50% - 52px);
            top: -10px;
            padding: 0 10px;
            background: #fff;
          }
        }
      }
    }
    .widget-login {
      text-align: center;
      .icon {
        height: 2em;
        width: 2em;
      }
    }
    .terms {
      margin-top: 15px;
      color: #777;
      text-align: center;
      margin-bottom: 0;
      a {
        color: #009a61;
        text-decoration: none;
      }
    }
  }

   .registDialog {
    .el-dialog {
      margin-top: 5vh !important;
      width: 33%;
    }
    .el-dialog__header {
      border-bottom: 1px solid #e5e5e5;
      text-align: left;
      background-color: #f3f3f3;
    }
    .el-dialog__body {
      padding: 30px 130px;
      .el-form {
        .el-form-item {
          margin-bottom: 10px;
          .el-button {
            margin-top: 10px;
            width: 100%;
            color: #fff;
            background-color: #009a61;
            border-color: #008151;
          }
        }
        .el-form-item__label {
          font-weight: bold;
          padding: 0 0 0px;
          line-height: 30px;
        }
      }
    }
    .widget-login {
      text-align: center;
      .icon {
        height: 2em;
        width: 2em;
      }
    }
    .terms {
      margin-top: 15px;
      color: #777;
      text-align: center;
      margin-bottom: 0;
      margin-top:3em;
      a {
        color: #009a61;
        text-decoration: none;
      }
    }
   }
</style>
