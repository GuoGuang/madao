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

    <el-dialog :visible.sync="searchDialog" :fullscreen="true" >
      <div class="search-form">
        <div class="search-form-inner">
          <div class="search-form-box"><input class="form-search" type="text" name="s" placeholder="键入搜索关键词">
            <button id="btn-search" type="submit">
              <i class="iconfont icon-search"/>
            </button>
          </div>
          <div class="search-commend"><h4>大家都在搜</h4>
            <ul>
              <li><a href="#">考试资料网</a></li>
              <li><a href="#">白帽子</a></li>
              <li><a href="#">Java</a></li>
              <li><a href="#">面试</a></li>
              <li><a href="#">万维题库</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="close-search" @click="toggleSearch">
        <span class="close-top"/>
        <span class="close-bottom"/>
      </div>
    </el-dialog>

    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <span class="navbar-blank"/>
          <img src="/images/logo.png" class="navbar-logo">
          <nuxt-link to="/" class="navbar-link" />
        </div>

        <div class="navbar-menu">
          <transition name="module">
            <nav-view />
          </transition>
        </div>
        <div style="display: flex;">
          <div class="navbar-right">

            <div class="message">
              <button id="sitemessage" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <i class="iconfont youyd-icon-megaphone"/>
              </button>
              <!-- <div class="dropdown-menu" role="menu" aria-labelledby="sitemessage">
            <ul>
              <li class="first"><span class="time">19.06.24</span><a target="_blank" href="#">免 root 卸载预置应用</a></li>
            </ul>
            <div class="more-messages"><a target="_blank" href="https://iboy.tech/technology">更多</a></div>
          </div> -->
            </div>
            <span class="line"/>
            <button class="search" @click="toggleSearch">
              <i class="iconfont youyd-icon-search"/>
            </button>

          </div>

          <!-- 已登录 -->
          <div v-if="loginStatus" class="user-profile">

            <ul style="">
              <li >
                <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link">
                    新文章<i class="el-icon-arrow-down el-icon--right"/>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>提问题</el-dropdown-item>
                    <el-dropdown-item>发布猿点</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <a class="dropdown-toggle-letter" href="/user/messages">
                  <span class="sr-only">
                    消息
                  </span>
                </a>
              </li>
              <li >

                <el-dropdown>
                  <span class="el-dropdown-link">
                    <img class="image" src="https://images.nowcoder.com/images/20180218/6617757_1518920311404_48DBFD0E780C1F7DCB9ABC4D5083B2BD@0e_100w_100h_0c_1i_1o_90Q_1x">
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
                      <router-link to="/profile">
                        GuoGuang
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>我的档案</el-dropdown-item>
                    <el-dropdown-item>个人设置</el-dropdown-item>
                    <el-dropdown-item>
                      <a @click="logout">退出</a>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </li></ul>
          <!-- <el-menu class="el-menu-demo" mode="horizontal" background-color="#f8f8f8" style="border-bottom: 0;">
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
          </el-menu> -->
          </div>

          <!-- 未登录 -->
          <div v-else class="navbar-login">
            <a href="#" class="tougao">投稿</a>
            <a class="login" style="font-size: 15px;" href="#" @click="loginDialogVisible = true">{{ $i18n.nav.login }}</a>
            <span class="line"/>
            <a class="register" style="font-size: 15px;" href="#" @click="registDialogVisible = true">{{ $i18n.nav.register }}</a>

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

export default {
  name: 'LayoutHeader',
  components: {
    NavView // 布局
  },
  data() {
    return {
      searchDialog: false,
      input: '',
      preload: false,
      loginDialogVisible: false,
      registDialogVisible: false,
      loginStatus: this.$store.state.user.token,
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
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          // 登录
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch((response) => {
            // 登录失败
            this.$message({
              message: response.message,
              type: 'error'
            })
            this.loading = false
          })
        }
      })
    },

    toggleSearch() {
      this.searchDialog = !this.searchDialog
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
      this.$store.dispatch('user/logout').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style>
@import '//at.alicdn.com/t/font_761917_pm5yzv4dl1.css';
</style>

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
          margin-left: -3em;
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          //width: 43em;
          position: relative;
          overflow: hidden;
        }

        .navbar-right{
          height: $header-height;
          display: flex;
          padding: 0 23px;
          position: relative;
          align-items: center;
          //width: 43em;
          position: relative;
          overflow: hidden;
          button{
            padding: 0 10px;
          }
          .message{
            padding-right: 10px
          }
          .search{

          }
        }

        .navbar-login {
          height: $header-height;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-left: .5em;
          position: relative;
          overflow: hidden;
          padding: 0;
          margin: 0;
          .login,.register{
             color: #48494d;
          }

          .login:hover{
              color:#19B5FE
            }
          .register:hover{
              color:#19B5FE
            }
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
           height: 4.5em;
            position: relative;
            align-items: center;
            position: relative;
            overflow: hidden;
            ul{
                  margin: 1em;
               display: flex;
              li{
                //line-height: 64px!important ;
                position: relative;
                padding: 0;
                margin: 0 0 0 2px;
                line-height: 34px;

              }
              li:hover{
                  background-color: #f3f3f3
              }
            }
            .dropdown-toggle-letter{
              display: inline-block;
              padding: 0 12px;
              height: 34px;color: #757575;
              font-weight: 500;
              -moz-border-radius: 4px;
              -webkit-border-radius: 4px;
              border-radius: 4px;
            }

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
            //background-image: url(http://localhost:3000/images/icode.png);
            width: 20rem;
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
  .line{
    height: 12px;display: inline-block;margin: 0 5px;border-right: 1px solid #E5E5E5;
  }
/* 搜索页 */
.search-form{position:fixed;top:0;left:0;right:0;bottom:0;background:#fff;-webkit-animation:fade-zoom-in .3s forwards;-o-animation:fade-zoom-in .3s forwards;animation:fade-zoom-in .3s forwards;;-webkit-backface-visibility:hidden;overflow:hidden;}
.search-form .search-form-inner{max-width:640px;padding:0 20px;margin:auto;position:absolute;width:100%;left:0;right:0;height:285px;top:-100px;bottom:0}
.search-form-inner p{margin-top:10px;color:#a0a0a0;text-align:center;font-size:20px}
.search-form.is-visible{display:block}
.search-form .search-form-box{position:relative;margin-bottom:40px}
.search-form input{background:#fff;display:inline-block;line-height:58px;height:58px;color:#949494;font-size:15px;border-radius:3px;padding:0 20px;width:100%;border:1px solid #e2e2e2;text-align:left;-webkit-appearance:none}
.search-form button{background:#000;display:inline-block;line-height:58px;height:58px;width:100px;color:#fff;font-size:15px;padding:0 25px;margin:0;border-radius:0 3px 3px 0;position:absolute;right:0;top:0}
.search-form input::-webkit-input-placeholder{color:#949494}
.search-form input:-moz-placeholder{color:#949494}
.search-form input::-moz-placeholder{color:#949494}
.search-form input:-ms-input-placeholder{color:#949494}
.search-commend{position:relative}
.search-commend h4{position:relative;font-size:16px;margin:0 0 20px}
.search-commend ul li{display:inline-block;margin-bottom:10px;margin-right:10px}
.search-commend ul li a{display:inline-block;line-height:1;padding:10px 20px;border:1px solid #e2e2e2;border-radius:2px;color:#949494}
.search-commend ul li a:hover{color:#273746;border-color:#273746}

.close-search{display:block;position:absolute;top:10%;right:10%;width:80px;height:80px;cursor:pointer;background:#fff}
.close-search .close-top{top:34px}
.close-search .close-bottom{bottom:34px}

.close-search:hover .close-top{-webkit-transform:translate(0,5px) rotate(225deg);transform:translate(0,5px) rotate(45deg)}
.close-search:hover .close-bottom{-webkit-transform:translate(0,-5px) rotate(135deg);transform:translate(0,-5px) rotate(315deg)}
.close-bottom{-webkit-transform:translate(0,-5px) rotate(135deg);transform:translate(0,-5px) rotate(135deg);}
.close-top{-webkit-transform:translate(0,5px) rotate(225deg);transform:translate(0,5px) rotate(225deg)}
.close-top{
  top: 34px;
  width: 45px;
  left: 16px;
  }
.close-bottom{
  bottom: 34px;
  width: 45px;
  left: 16px;
  }
.close-bottom,.close-top{
  position:absolute;
  background:#333;
  height:2px;
  transition:.3s;
}
/* 搜索页end */

.tougao{background:transparent;font-size:15px;border:1px solid #337ab7;border-radius:40px;padding:5px 16px;line-height:1;color:#337ab7;margin-right:10px;}
.tougao:hover{background:#282828;border-color:#282828;color:#FFF;}

// 弹框效果
.el-dialog__wrapper {
	transition-duration: 0.3s;
}
.dialog-fade-enter-active{
	animation: none !important;
}
.dialog-fade-leave-active {
	transition-duration: 0.15s !important;
	animation: none !important;
  }

.dialog-fade-enter-active .el-dialog,
.dialog-fade-leave-active .el-dialog{
	animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog{
	animation-duration: 0.3s;
	animation-name: anim-open;
	animation-timing-function: cubic-bezier(0.6,0,0.4,1);
}

.dialog-fade-leave-active .el-dialog{
	animation-duration: 0.3s;
	animation-name: anim-close;
}

@keyframes anim-open {
	0% { opacity: 0;  transform: scale3d(0, 0, 1); }
	100% { opacity: 1; transform: scale3d(1, 1, 1); }
}

@keyframes anim-close {
	0% { opacity: 1; }
	100% { opacity: 0; transform: scale3d(0.5, 0.5, 1); }
}

</style>
