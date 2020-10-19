<template>
  <!-- 页面头部 -->
  <header v-cloak id="header" class="header" >

    <el-dialog :visible.sync="loginDialogVisible" :before-close="loginDialogClose" :show-close="false" class="loginDialog" width="27%" >
      <div style="margin: -4em;">
        <img src="/images/svg/login.svg" >
      </div>
      <!-- :model="formLabelAlign" -->
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-position="top" label-width="80px" size="mini">
        <el-form-item prop="account">
          <MDinput v-model="loginForm.account" :maxlength="11" class="input">
            请输入手机号或邮箱
          </MDinput>
        </el-form-item>
        <el-form-item prop="password">
          <MDinput v-model="loginForm.password" :maxlength="11" type="password">
            请输入密码
          </MDinput>
        </el-form-item>
        <el-form-item prop="captcha">
          <div style="display: flex; justify-content: flex-end;">
            <MDinput v-model="loginForm.captcha" :maxlength="6" class="input" style="width: 100%;">
              请输入验证码
            </MDinput>
            <el-image
              :src="'data:image/png;base64,'+ loginForm.captchaBase64"
              style="position: absolute;top: 3em;"
              fit="none"
              @click="fetchUserCaptcha"
            >
              <div slot="error" class="image-slot">
                加载失败，请刷新
              </div>
            </el-image>
          </div>
        </el-form-item>

        <el-form-item class="other-opt">
          <a href="#" class="phoneLogin" @click="loginDialogVisible =false;registerDialogVisible = true;">手机验证码登录</a>
          <a href="#" class="forget">忘记密码</a>
        </el-form-item>

        <el-form-item>
          <el-button :loading="loadingStatus" type="primary" size="medium" @click="login('ruleForm')">登录</el-button>
        </el-form-item>

        <div class="more-login-area">
          <span class="more-login-words">更多登录方式</span>
        </div>
      </el-form>
      <div class="oauth">
        <div class="oauth-bg">
          <img title="微博" alt="微博" src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/weibo.fa758eb.svg" class="oauth-btn">
        </div>
        <div class="oauth-bg">
          <img title="微信" alt="微信" src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/wechat.e0ff124.svg" class="oauth-btn">
        </div>

        <div class="oauth-bg">
          <img title="GitHub" alt="GitHub" src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/github.547dd8a.svg" class="oauth-btn">
        </div>
      </div>
      <p class="terms">
        登录即表示你同意网站的<a href="/terms" target="_blank">《服务条款》</a>
      </p>
    </el-dialog>

    <el-dialog :visible.sync="registerDialogVisible" class="registDialog" title="注册" width="30%">
      <div v-if="registerStatus === 1">
        <h3>登录过程中会用到短信，请准备好您的手机</h3>
        <el-form label-position="top" label-width="80px" size="mini">
          <MDinput v-model="registerPhone" :maxlength="11">
            请输入手机号
          </MDinput>
          <p class="terms">
            <!-- 同意<a href="/tos" target="_blank">《用户协议》《隐私政策》</a> -->
          </p>
          <el-form-item>
            <el-button size="medium" type="primary" @click="nextRegister">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="registerStatus === 2">
        <div class="modify-info-country">
          <h3 class="modify-country" >中国大陆</h3>
          <span class="modify-phonenum">{{ registerPhone }}</span>
          <!-- a class="btn-modify-info" >修改</a> -->
        </div>

        <el-form label-position="top" label-width="80px" size="mini">
          <MDinput v-model="captcha" :maxlength="6">
            请输入收到的验证码
          </MDinput>
          <el-form-item>
            <el-button size="medium " type="primary" @click="validateRegister">注册</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div v-else-if="registStatus === 3">

        <el-alert
          :closable="false"
          style="background-color:''"
          title="恭喜您注册成功"
          type="success"
          center
          show-icon/>
        <div class="righstSuccess">
          <p class="success-info">下面是您在本网站的头像和昵称</p>
          <el-avatar :src="registerDetail.avatar" size="large" style="margin:1em 1em 0 1em;"/>
          <p>{{ registerDetail.nickName }}</p>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="searchDialog" :fullscreen="true" @open="show()">
      <div class="search-form">
        <div class="search-form-inner">
          <div class="search-form-box">
            <input ref="input" v-model.trim="keyword" class="form-search" placeholder="键入搜索关键词" @keyup.enter="handleSearch">
            <button id="btn-search" @click="handleSearch">
              <i class="iconfont icon-search"/>
            </button>
          </div>
          <div class="search-commend"><h4>大家都在搜</h4>
            <ul>
              <li><a href="/search/考试资料网">考试资料网</a></li>
              <li><a href="/search/白帽子">白帽子</a></li>
              <li><a href="/search/Java">Java</a></li>
              <li><a href="/search/面试">面试</a></li>
              <li><a href="/search/万维题库">万维题库</a></li>
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
      <div class="navbar-container container" >

        <div class="navbar-header" >
          <span class="navbar-blank"/>
          <img :src="`https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/logo.png`" alt="logo" class="navbar-logo">
          <nuxt-link to="/" class="navbar-link" />
        </div>

        <div class="navbar-menu" >
          <transition name="module">
            <nav-view />
          </transition>
        </div>
        <div style="">
          <div class="navbar-search" style="float: left;">
            <span class="line"/>
            <button class="search" @click="toggleSearch">
              <i class="iconfont icon-search"/>
            </button>
          </div>
          <!-- 已登录 -->
          <div v-if="loginStatus" class="user-profile">

            <ul style="">
              <li >
                <!-- <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link">
                    新文章<i class="el-icon-arrow-down el-icon--right"/>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>提问题</el-dropdown-item>
                    <el-dropdown-item>发布猿点</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
                <a href="mailto:guoguang0536@gmail.com" class="tougao">投稿</a>

                <a class="dropdown-toggle-letter" href="/user/messages">
                  <el-badge :value="12" class="item">
                    <i class="iconfont icon-bell"/>
                  </el-badge>

                </a>
              </li>
              <li >

                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-avatar :src="userInfo.avatar" size="medium"/>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
                    <router-link :to="`/user/${userInfo.id}`">
                      <el-dropdown-item >
                        {{ userInfo.nickName }}
                      </el-dropdown-item>
                    </router-link>
                    <router-link to="/profile">
                      <el-dropdown-item>
                        编辑资料
                      </el-dropdown-item>
                    </router-link>
                    <a @click="logout">
                      <el-dropdown-item>
                        退出
                      </el-dropdown-item>
                    </a>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>

          <!-- 未登录-->
          <div v-else class="navbar-login">
            <a href="mailto:guoguang0536@gmail.com" class="tougao">投稿</a>
            <a class="login" style="font-size: 15px;" href="#" @click="loginDialog">{{ $i18n.nav.login }}</a>
            <span class="line"/>
            <a class="register" style="font-size: 15px;" href="#" @click="registerDialogVisible = true">{{ $i18n.nav.register }}</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { isBrowser } from '~/environment/esm'
import NavView from '~/components/layout/pc/nav'
import { isSearchArchiveRoute } from '~/utils/route'
import { Route } from '~/constants/system'
// import { getToken } from '@/utils/auth' // 从cookie中获取token getToken
import MDinput from '~/components/global/MDinput'
export default {
  name: 'LayoutHeader',
  components: {
    MDinput,
    NavView // 布局
  },
  data() {
    return {
      /* 注册状态 */
      registerStatus: 1,
      registerPhone: '',
      registerDetail: {},
      userInfo: this.$store.state.user.data,
      captcha: '',
      loadingStatus: false,
      cdnUrl: this.cdnUrl,
      searchDialog: false,
      input: '',
      keyword: '',
      preload: false,
      loginDialogVisible: false,
      registerDialogVisible: false,
      loginStatus: this.$store.state.user.token,
      loginForm: {
        id: '',
        account: '18595253655',
        captchaBase64: '',
        deviceId: '',
        captcha: '',
        password: 'madao'
      },

      rules: {
        account: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {

  },
  created() {

  },
  mounted() {
    if (isBrowser) {
      window.addLoadedTask(() => {
        this.preload = true
      })
    }
  },
  methods: {
    handleSearch() {
      const keyword = this.keyword
      const paramsKeyword = this.$route.params.keyword
      const isSearchPage = isSearchArchiveRoute(this.$route.name)
      if (keyword && (isSearchPage ? paramsKeyword !== keyword : true)) {
        this.$router.push({ name: Route.SearchArchive, params: { keyword }})
      }
      this.searchDialog = false
    },
    /**
     * 获取验证码
     */
    fetchUserCaptcha() {
      this.$store.dispatch('user/fetchCaptcha', this.loginForm).then(response => {
        this.loginForm.captchaBase64 = response.data.base64Code
        this.loginForm.deviceId = response.data.deviceId
      }).catch(({ data, hideCommonError }) => {
        this.$message({
          message: '获取图形验证码失败，请稍后再试！',
          type: 'warning'
        })
        hideCommonError() // 是否隐藏拦截器里的错误提示
      })
    },
    login() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loadingStatus = true
          // 登录
          this.$store.dispatch('user/LoginByUsername', this.loginForm).then((response) => {
            this.userInfo = response.data
            this.loadingStatus = false
            this.$router.go(0)
          }).catch((response) => {
            // 登录失败
            this.$message({
              message: response.message,
              type: 'error'
            })
            this.loadingStatus = false
          })
        }
      })
    },

    toggleSearch() {
      this.searchDialog = !this.searchDialog
    },

    /**
     * 切换注册状态
     */
    nextRegister() {
      this.$store.dispatch('user/sendMessage', this.registerPhone).then(() => {
        this.registStatus = 2
      })
    },
    validateRegister() {
      this.$store.dispatch('user/register', { 'phone': this.registerPhone, 'captcha': this.captcha }).then((response) => {
        console.log('this.userDetail = response-----', response)
        this.userDetail = response.data
        this.registStatus = 3
        setTimeout(() => {
          this.$router.go(0)
        }, 3000)
      }).catch((response) => {
        // 登录失败
        this.$message({
          message: response.message,
          type: 'error'
        })
        this.loadingStatus = false
      })
    },

    /**
     * resolve el-dialog can not use “this.$refs” problem
     */
    show() {
      this.keyword = ''
      setTimeout(() => {
        this.$refs.input.focus()
      }, 0)
    },

    loginDialog() {
      this.fetchUserCaptcha()
      this.loginDialogVisible = true
    },

    loginDialogClose() {
      this.loginDialogVisible = false
      this.$nextTick(() => {
        this.$refs['loginForm'].clearValidate()
      })
    },

    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.go(0)
      })
    }
  }
}
</script>
<style>
[v-cloak]
{
display: none!important;
}
</style>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
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
        position: relative;
        overflow: hidden;
      }

      .navbar-search {
        height: $header-height;
        display: flex;
        padding: 0 23px;
        position: relative;
        align-items: center;
        //width: 43em;
        position: relative;
        overflow: hidden;
        button {
          padding: 0 10px;
        }
        .message {
          padding-right: 10px;
        }
        .search {
        }
      }

      .navbar-login {
        height: $header-height;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-left: 0.5em;
        position: relative;
        overflow: hidden;
        padding: 0;
        margin: 0;
        .login,
        .register {
          color: #48494d;
        }

        .login:hover {
          color: #19b5fe;
        }
        .register:hover {
          color: #19b5fe;
        }
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
          margin-bottom: 0.5em;
          position: relative;
        }
      }

      .user-profile {
        height: 4.5em;
        position: relative;
        align-items: center;
        position: relative;
        overflow: hidden;
        ul {
          margin: 1em;
          display: flex;
          li {
            //line-height: 64px!important ;
            position: relative;
            padding: 0;
            margin: 0 0 0 2px;
            line-height: 34px;
          }
        }
        .dropdown-toggle-letter {
          display: inline-block;
          padding: 0 25px 0 0;
          height: 34px;
          color: #757575;
          font-weight: 500;
          -moz-border-radius: 4px;
          -webkit-border-radius: 4px;
          border-radius: 4px;
          .icon-bell {
            font-size: 19px;
          }
          .icon-bell:hover {
            color: var(--primary-color);
          }
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
            opacity: 1;
          }

          35% {
            opacity: 1;
          }

          39% {
            opacity: 0;
          }

          50% {
            opacity: 0.8;
          }

          60% {
            opacity: 0.8;
          }

          65% {
            opacity: 0.8;
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
            background: radial-gradient(
              white,
              rgba(255, 255, 255, 0.2),
              rgba(255, 255, 255, 0)
            );
          }
        }

        .navbar-link {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .navbar-logo {
          width: 20rem;
          margin-right: 0;
          filter: $theme-logo-rotate;

          .logo-st {
            fill: $primary;
          }
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

.user-dropdown-menu {
  padding: 0px;
  li + li {
    border-top: 1px solid #e6e6e6;
  }
}
.loginDialog {

  .oauth {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 15px;
    .oauth-bg {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: #f4f8fb;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .oauth-btn{
      height: 1.9rem;
      vertical-align: bottom;
      cursor: pointer;
    }
  }
  .el-dialog__header{
    padding:inherit
  }
  .el-dialog {
    width: 33%;
  }
  .el-dialog__header {
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    background-color: #f3f3f3;
  }
  .el-dialog__body {
    .el-form{
      margin-top: 3em;
      padding: 20px 10px 0px;
    }
    .el-form {
      .other-opt {
        margin: 0.5em 0 1em;
      }
      .el-form-item {
        color: #007fff;
        .forget {
          text-decoration: none;
          float: right;
        }
        .el-button {
          width: 100%;
          color: #fff;
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
          position: absolute;
          color: #8590a6;
          left: calc(50% - 52px);
          top: -10px;
          padding: 0 10px;
          background: #fff;
        }
      }
    }
  }
  .terms {
    color: #777;
    text-align: center;
    margin-bottom: 0;
  }
}

.registDialog {
  h3 {
    margin: 0;
  }
  .el-alert--success {
    background-color: inherit;
  }
  .el-dialog {
    width: 33%;
  }
  .el-dialog__header {
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    background-color: #f3f3f3;
  }
  .el-dialog__body {
    padding: 20px 50px;
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-button {
          margin-top: 10px;
          width: 100%;
        }
      }
      .el-form-item__label {
        font-weight: bold;
        padding: 0 0 0px;
        line-height: 30px;
      }
    }
  }
  .terms {
    margin-top: 15px;
    color: #777;
    text-align: center;
    margin-bottom: 0;
    margin-top: 3em;
    a {
      color: #007fff;
      text-decoration: none;
    }
  }
  .modify-info-country {
    display: flex;
    .modify-country {
      width: 30%;
    }
    .modify-phonenum {
      width: 50%;
    }
  }
  .righstSuccess {
    .success-info {
      color: #888888;
      margin-top: 2em;
      margin-bottom: 0;
    }
    text-align: center;
  }
}
.line {
  height: 12px;
  display: inline-block;
  margin: 0 10px;
  border-right: 1px solid #e5e5e5;
}
/* 搜索页 */
.search-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  -webkit-animation: fade-zoom-in 0.3s forwards;
  -o-animation: fade-zoom-in 0.3s forwards;
  animation: fade-zoom-in 0.3s forwards;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
}
.search-form .search-form-inner {
  max-width: 640px;
  padding: 0 20px;
  margin: auto;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  height: 285px;
  top: -100px;
  bottom: 0;
}
.search-form-inner p {
  margin-top: 10px;
  color: #a0a0a0;
  text-align: center;
  font-size: 20px;
}
.search-form.is-visible {
  display: block;
}
.search-form .search-form-box {
  position: relative;
  margin-bottom: 40px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.35);
}
.search-form input {
  background: #fff;
  display: inline-block;
  line-height: 58px;
  height: 58px;
  color: #949494;
  font-size: 15px;
  border-radius: 3px;
  padding: 0 20px;
  width: 100%;
  border: 1px solid #e2e2e2;
  text-align: left;
  -webkit-appearance: none;
}
.search-form button {
  background: #000;
  display: inline-block;
  line-height: 58px;
  height: 58px;
  width: 100px;
  color: #fff;
  font-size: 15px;
  padding: 0 25px;
  margin: 0;
  border-radius: 0 3px 3px 0;
  position: absolute;
  right: 0;
  top: 0;
}
.search-form input::-webkit-input-placeholder {
  color: #949494;
}
.search-form input:-moz-placeholder {
  color: #949494;
}
.search-form input::-moz-placeholder {
  color: #949494;
}
.search-form input:-ms-input-placeholder {
  color: #949494;
}
.search-commend {
  position: relative;
}
.search-commend h4 {
  position: relative;
  font-size: 16px;
  margin: 0 0 20px;
}
.search-commend ul li {
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 10px;
}
.search-commend ul li a {
  display: inline-block;
  line-height: 1;
  padding: 10px 20px;
  border: 1px solid #e2e2e2;
  border-radius: 2px;
  color: #949494;
}
.search-commend ul li a:hover {
  color: #273746;
  border-color: #273746;
}

.close-search {
  display: block;
  position: absolute;
  top: 10%;
  right: 10%;
  width: 80px;
  height: 80px;
  cursor: pointer;
  background: #fff;
}
.close-search .close-top {
  top: 34px;
}
.close-search .close-bottom {
  bottom: 34px;
}

.close-search:hover .close-top {
  -webkit-transform: translate(0, 5px) rotate(225deg);
  transform: translate(0, 5px) rotate(45deg);
}
.close-search:hover .close-bottom {
  transform: translate(0, -5px) rotate(315deg);
}
.close-bottom {
  transform: translate(0, -5px) rotate(135deg);
}
.close-top {
  -webkit-transform: translate(0, 5px) rotate(225deg);
  transform: translate(0, 5px) rotate(225deg);
}
.form-search {
  --primary-color: #323435;
}

.close-top {
  top: 34px;
  width: 45px;
  left: 16px;
}
.close-bottom {
  bottom: 34px;
  width: 45px;
  left: 16px;
}
.close-bottom,
.close-top {
  position: absolute;
  background: #333;
  height: 2px;
  transition: 0.3s;
}
/* 搜索页end */

.tougao {
  background: transparent;
  font-size: 15px;
  border: 1px solid #337ab7;
  border-radius: 40px;
  padding: 5px 16px;
  line-height: 1;
  color: #337ab7;
  margin-right: 15px;
}
.tougao:hover {
  background: #282828;
  border-color: #282828;
  color: #fff;
}

// 弹框效果
.el-dialog__wrapper {
  transition-duration: 0.3s;
}
.dialog-fade-enter-active {
  animation: none !important;
}
.dialog-fade-leave-active {
  transition-duration: 0.15s !important;
  animation: none !important;
}

.dialog-fade-enter-active .el-dialog,
.dialog-fade-leave-active .el-dialog {
  animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog {
  animation-duration: 0.3s;
  animation-name: anim-open;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
}

.dialog-fade-leave-active .el-dialog {
  animation-duration: 0.3s;
  animation-name: anim-close;
}

@keyframes anim-open {
  0% {
    opacity: 0;
    transform: scale3d(0, 0, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

@keyframes anim-close {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 1);
  }
}
</style>
