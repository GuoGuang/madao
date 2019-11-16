<template>
  <div :class="{ mobile: isMobile }" class="page">
    <div class="detail">
      <div class="content">
        <div class="about">
          <div class="about-all">
            <div class="about-me">
              <div class="desc">
                <p class="item webfont">
                  <i class="iconfont icon-user"/>
                  <span v-if="isEnLang">
                    <span class="first-letter">I</span>'m GuoGuang, a (95+) (小) Javascript (鲜) stack (肉) developer.
                  </span>
                  <span v-else>
                    <span class="first-letter">古</span>
                    <b>之立大事者，不惟有超世之才，亦必有坚韧不拔之志。</b>
                  </span>
                </p>
                <p class="item">
                  <i class="iconfont icon-comment"/>
                  <span v-if="isEnLang">Taolu committee:</span>
                  <span v-else>WeChat：</span>
                  <!-- href="https://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4">288325802</a> -->
                  <a
                    target="_blank"
                    rel="external nofollow noopenter"

                    href="#">15866534150</a>
                  <span/>
                </p>
                <p class="item">
                  <i class="iconfont icon-music"/>
                  <nuxt-link to="/music">Jazz-HipHop, Electronic, Disco, Rock, Punk.</nuxt-link>
                </p>
                <p class="item webfont">
                  <i class="iconfont icon-upvote"/>
                  <span v-if="isEnLang">code. beauty. whisky. music. vagrant.</span>
                  <span v-else>
                    <span/>
                    <b>"Everyone should learn how to program a computer because it teaches you how to think” </b>
                  </span>
                </p>
                <p class="item">
                  <i class="iconfont icon-coffee"/>
                  <span class="accounts">
                    <span>
                      <a
                        href="https://github.com/GuoGuang0536"
                        target="_blank"
                        class="github"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-github"/>
                      </a>
                      <a
                        v-if="false"
                        href="#"
                        target="_blank"
                        class="mail"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-mail"/>
                      </a>
                      <a href="#" target="_blank" class="telegram" rel="external nofollow noopenter">
                        <i class="iconfont icon-telegram"/>
                      </a>
                      <a
                        v-if="false"
                        href="#"
                        target="_blank"
                        class="juejin"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-juejin"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="zhihu"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-zhihu"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="weibo"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-weibo"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="youtube"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-youtube"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="bilibili"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-bilibili"/>
                      </a>
                    </span>
                    <span v-if="!isMobile">
                      <a
                        v-if="false"
                        href="#"
                        target="_blank"
                        class="taobao"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-taobao"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="stackoverflow"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-stackoverflow"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="algorithm"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-algorithm"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="quora"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-quora"/>
                      </a>
                      <a
                        v-if="false"
                        href="#"
                        target="_blank"
                        class="linkedin"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-linkedin"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="twitter"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-twitter"/>
                      </a>
                      <a
                        v-if="false"
                        href="#"
                        target="_blank"
                        class="facebook"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-facebook"/>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        class="instagram"
                        rel="external nofollow noopenter">
                        <i class="iconfont icon-instagram"/>
                      </a>
                    </span>
                  </span>
                </p>
                <p class="item webfont">
                  <i class="iconfont icon-code"/>
                  <span v-if="isEnLang" class="skills">Talk is cheap. fuck me.</span>
                  <span v-else>
                    <span v-if="getRandomSkill()">吾生有涯愿无尽，心期填海力移山</span>
                    <span v-else>酒醒只在花前坐，酒醉还来花下眠</span>
                  </span>
                </p>
                <p v-if="!isMobile" class="item">
                  <i class="iconfont icon-friend"/>
                  <span class="friends">
                    <a href="#" target="_blank" rel="external nofollow noopenter">「 skyrover
                    」</a>
                    <a href="#" target="_blank" rel="external nofollow noopenter">「 JimmyLv
                    」</a>
                    <a href="#" target="_blank" rel="external nofollow noopenter">「 Channg 」</a>
                  </span>
                </p>
              </div>
              <div class="gravatar">
                <div class="background be-2">
                  <img src="/images/about-background-be-2.jpg" alt="background" class="image">
                </div>
                <div class="background be-1">
                  <img src="/images/about-background-be-1.jpg" alt="background" class="image">
                </div>
                <div class="background star-1">
                  <img src="/images/about-background-star-1.png" alt="background-star" class="image">
                </div>
                <div class="background star-2">
                  <img src="/images/about-background-star-2.png" alt="background-star" class="image">
                </div>
                <img :src="gravatar" class="avatar">
                <div class="desc">
                  <h2 class="name">
                    <strong>Youyd</strong>
                  </h2>
                  <p class="skill">Java Developer.</p>
                </div>
                <a v-if="!isMobile" class="followme" href @click.stop.prevent>{{ isEnLang ? 'Friend me' : '众里寻他' }}</a>
                <div v-if="!isMobile" class="wechat" @mouseenter="handleFollowMe"/>
              </div>
            </div>
            <div v-if="!isMobile" class="about-map">
              <iframe class="iframe" src="/partials/map.html"/>
            </div>
            <!-- <div class="about-project">
              <nuxt-link to="/project" class="project-link">
                <p class="title">Get More Project</p>
                <p class="item">了解更多关于我的开源项目的进展</p>
              </nuxt-link>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  head() {
    return {
      title: `${this.isEnLang ? '' : this.$i18n.nav.about + ' | '}About`
    }
  },
  fetch({ store }) {
    return store.dispatch('global/fetchAdminInfo')
  },
  computed: {
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    },
    gravatar() {
      const gravatar = this.$store.state.global.adminInfo.gravatar
      return gravatar
        // ? `${gravatar}?imageView2/1/w/360/h/360/interlace/1/q/75|imageslim`
        ? `https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/IMG_0610.JPG`
        : `${this.cdnUrl}/images/gravatar.jpg`
    }
  },
  methods: {
    handleFollowMe() {
      this.$ga.event('加微信码', '点击', 'tool')
    },
    getRandomSkill() {
      return !!Math.floor(Math.random() * 2)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &.mobile {
    > .detail {
      margin: 0;

      > .content {
        > .about {
          > .about-all {
            > .about-me {
              flex-direction: column-reverse;

              > .gravatar {
                width: 100%;
                margin-bottom: 1rem;
                flex-direction: row;
                padding: 2rem 0;

                > .background {
                  height: 100%;

                  &.star-1,
                  &.star-2 {
                    > .image {
                      width: 4rem;
                    }
                  }

                  > .image {
                    width: 200%;
                    height: auto;
                  }
                }

                > .avatar {
                  width: 25%;
                  margin-top: 0;
                  margin-left: 6%;
                }

                > .desc {
                  width: 50%;
                  margin-left: 5%;
                  text-align: left;
                  z-index: 1;
                  color: $white;

                  > .name,
                  > .skill {
                    margin: 1rem 0;
                  }
                }

                > .favorite {
                  margin: 1rem 0;
                  margin-bottom: 2rem;
                }
              }

              > .desc {
                width: 100%;
                padding: 1em;
                overflow: hidden;

                > .item {
                  @include text-overflow();

                  > .iconfont {
                    margin-right: 1rem;
                  }

                  > .accounts {
                    bottom: auto;
                  }
                }
              }
            }

            > .about-map {
              display: none;
            }

            > .about-project {
              height: auto;

              > .project-link {
                height: auto;
                padding-top: 1rem;
                overflow: hidden;

                > .title {
                  font-size: 2em;
                }
              }
            }
          }
        }
      }
    }
  }

  > .detail {
    > .content {
      width: 100%;
      overflow: hidden;

      > .about {
        .about-me {
          width: 100%;
          height: auto;
          margin-bottom: 1em;
          overflow: hidden;
          display: flex;
          justify-content: space-between;

          .gravatar {
            width: 25%;
            display: flex;
            align-items: center;
            flex-direction: column;
            position: relative;
            justify-content: flex-start;
            background-color: $module-bg;

            @keyframes aboutbg-be-1 {
              0% {
                transform: translate3d(0%, 0%, 0);
              }

              25% {
                transform: translate3d(-50%, -50%, 0);
              }

              50% {
                transform: translate3d(-50%, 0%, 0);
              }

              75% {
                transform: translate3d(0%, -50%, 0);
              }

              100% {
                transform: translate3d(0%, 0%, 0);
              }
            }

            @keyframes aboutbg-be-2 {
              0% {
                transform: translate3d(0%, 0%, 0);
              }

              25% {
                transform: translate3d(0%, -50%, 0);
              }

              50% {
                transform: translate3d(-20%, 0%, 0);
              }

              75% {
                transform: translate3d(-30%, -50%, 0);
              }

              100% {
                transform: translate3d(0%, 0%, 0);
              }
            }

            @keyframes aboutbg-star {
              0% {
                opacity: 1;
              }

              25% {
                opacity: 0.5;
              }

              50% {
                opacity: 0.8;
              }

              75% {
                opacity: 0.2;
              }

              100% {
                opacity: 1;
              }
            }

            > .background {
              content: '';
              display: block;
              position: absolute;
              width: 100%;
              height: 26%;
              top: 0;
              right: 0;
              z-index: 0;
              overflow: hidden;

              &.be-1 {
                opacity: 0.66;

                > .image {
                  width: auto;
                  height: 200%;
                  animation: aboutbg-be-1 88s linear infinite;
                }
              }

              &.be-2 {
                opacity: 1;

                > .image {
                  width: auto;
                  height: 200%;
                  animation: aboutbg-be-2 66s linear infinite;
                }
              }

              &.star-1,
              &.star-2 {
                width: auto;
                height: auto;
                right: 1rem;

                > .image {
                  width: 5rem;
                  height: auto;
                  animation: aboutbg-star 6s linear infinite;
                }
              }
            }

            &:hover {
              > .avatar {
                @include css3-prefix(transform, rotate(360deg));
              }

              > .wechat {
                visibility: visible;
                opacity: 0.8;
              }
            }

            > .avatar {
              width: 40%;
              z-index: 1;
              margin-top: 5rem;
              max-width: 100%;
              border-radius: 100%;
              border: 0.4rem solid $module-bg;
              box-sizing: content-box;
              @include css3-prefix(transition, transform 1s);
            }

            > .desc {
              text-align: center;

              > .skill {
                margin-top: 0.466rem;
              }
            }

            > .followme {
              margin-top: 1.666rem;
              display: inline-block;
              color: $primary;
              border: 1px solid $primary;
              border-radius: 1px;
              width: 56%;
              height: 2.68rem;
              text-align: center;
              line-height: 2.46rem;

              &:hover {
                color: $white;
                background-color: $primary;
              }
            }

            > .wechat {
              opacity: 0;
              visibility: hidden;
              position: absolute;
              top: 0.6rem;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url('/images/wechat.jpg');
              background-size: contain;
              background-position: bottom;
              z-index: 9;
            }
          }

          > .desc {
            width: 73%;
            padding: 2em 3em;
            background-color: $module-bg;

            .item {
              line-height: 2.5em;
              min-height: 2.5em;

              &.webfont {
                font-family: webfont-bolder, DINRegular;
              }

              &:first-child {
                > span {
                  display: inline;

                  > .first-letter {
                    font-size: $font-size-h1;
                  }
                }
              }

              &:last-child {
                margin-bottom: 0;
              }

              > .iconfont {
                width: 2rem;
                font-size: 1.5rem;
                text-align: center;
                margin-right: 2rem;
                display: inline-block;
                color: rgba($black, 0.2);

                &.icon-code {
                  color: $black;
                }

                &.icon-upvote {
                  color: $red;
                }

                &.icon-friend {
                  color: $accent;
                }
              }

              > .friends {
                > a {
                  margin-right: 1em;
                  text-transform: capitalize;
                }
              }

              > .accounts {
                a {
                  margin-right: 1.35em;

                  > .iconfont {
                    font-size: 1.6rem;
                  }

                  &:hover {
                    &.github {
                      color: #24282d;
                    }

                    &.juejin {
                      color: #2b6df6;
                    }

                    &.telegram {
                      color: #54a5dd;
                    }

                    &.zhihu {
                      color: #3582f7;
                    }

                    &.weibo {
                      color: #d53437;
                    }

                    &.youtube {
                      color: #ec3323;
                    }

                    &.bilibili {
                      color: #449fd1;
                    }

                    &.stackoverflow {
                      color: #e6863d;
                    }

                    &.algorithm {
                      color: #fea116;
                    }

                    &.quora {
                      color: #b92b27;
                    }

                    &.linkedin {
                      color: #478cc5;
                    }

                    &.twitter {
                      color: #499feb;
                    }

                    &.instagram {
                      color: #000;
                    }
                  }
                }
              }
            }
          }
        }

        .about-map {
          width: 100%;
          padding: 0.5em;
          margin-bottom: 1em;
          overflow: hidden;
          background-color: $module-bg;
          position: relative;

          > .iframe {
            width: 100%;
            height: 19rem;
          }
        }

        .about-project {
          width: 100%;
          height: 16em;
          padding: 0.5em;
          overflow: hidden;
          background-color: $module-bg;

          .project-link {
            height: 15em;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            &:hover {
              background-color: $module-hover-bg;
            }

            .title {
              margin-bottom: 0.5em;
              font-size: 3em;
              text-transform: uppercase;
            }
          }
        }
      }
    }
  }
}
</style>
