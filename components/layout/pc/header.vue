<template>
  <!-- 页面头部 -->
  <header id="header" class="header">

    <el-dialog class="loginDialog" title="登录" :visible.sync="loginDialogVisible" width="30%" >
      <!-- :model="formLabelAlign" -->
        <el-form label-position="top" label-width="80px"  size="mini">
          <el-form-item label="手机号 或 Email">
            <el-input placeholder="11 位手机号 或 Email"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <span class="pull-right"><a href="/user/forgot" tabindex="4">忘记密码</a></span>
            <el-input placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
    </el-dialog>

    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <span class="navbar-blank"></span>
          <img src="/images/logo.svg" class="navbar-logo">
          <nuxt-link to="/" class="navbar-link" />
        </div>
        
        <div class="navbar-menu">
            <transition name="module" >
              <nav-view />
            </transition>
        </div>

        <div class="navbar-search">
            <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
        </div>

        <div class="navbar-login">
          
            <a style="color: #009a61;font-size: 14px;" href="#" @click="loginDialogVisible = true">{{$i18n.nav.login}}</a>
          
          <nuxt-link to="/project" class="item" style="margin-left: 10px !important;">
             <el-button size="small" type="success" >{{$i18n.nav.register}}</el-button>
          </nuxt-link>
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
    name: 'layout-header',
    components: {
       NavView // 布局
    },
    data() {
      return {
        input:"",
        preload: false,
        loginDialogVisible: false
      }
    },
    mounted() {
      if (isBrowser) {
        window.addLoadedTask(() => {
          this.preload = true;
        })
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
    methods: {
      loginDialog(){
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
      }
    }
  }
</script>

<style lang="scss" scoped>

        
.el-button--success{
    color: #fff;
    background-color: #009a61;
    border-color: #008151;
    font-size: 14px;
}

.nav-login-btn{
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

        .navbar-menu{
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          //width: 43em;
          position: relative;
          overflow: hidden;
        }

        .navbar-search{
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          //width: 43em;
          position: relative;
          overflow: hidden;
        }
        
        .navbar-login{
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
           > .item {
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
            5% { opacity: 1 }
            35% { opacity: 1 }
            39% { opacity: 0 }
            50% { opacity: .8 }
            60% { opacity: .8 }
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

          > .navbar-blank {
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

          > .panel {
            display: flex;
            justify-content: flex-start;
            margin-bottom: .2rem;

            > .btn {
              margin-right: 1em;

              &:hover {

                > .iconfont {
                  color: $link-hover-color;
                }
              }
            }
          }

          > .song {
            font-size: 1rem;
            @include text-overflow();

            > .link {
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

      > .pre-load {
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
  .loginDialog{
    .el-dialog{
      margin-top:5vh!important;
      width: 33%;
    }
    .el-dialog__header{
        border-bottom: 1px solid #e5e5e5;
        text-align: left;
        background-color: #f3f3f3;
    }
     .el-dialog__body{
        padding: 30px 130px;
        .el-form{
          .el-form-item{
              .pull-right{
                float: right
              }
          }
          .el-form-item__label{
              font-weight: bold;
              padding: 0 0 0px; 
              line-height: 25px;
          }
        }
        
    }
  }

</style>
