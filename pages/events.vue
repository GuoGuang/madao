<template>
  <!-- 活动 -->
  <el-row class="events">
    <el-col v-for="(event, index) in events" :span="5" :key="index">
      <div class="grid-content bg-purple" style="background-color:black">
        <div class="widget-event">
          <a href="/e/1160000018042952"><img class="widget-event__banner lazy" data-original="https://activity-static.segmentfault.com/238/590/2385906813-5c4fd6b4c54ad_medium" src="https://activity-static.segmentfault.com/238/590/2385906813-5c4fd6b4c54ad_medium" style="display: inline;"></a>
          <div class="widget-event__info" style="padding: 15px 15px 0;">
            <h2 class="title"><a href="/e/1160000018042952">MTSC2019 第五届中国移动互联网测试开发大会</a></h2>
            <ul class="widget-event__meta">
              <li>时间：2019-06-28 周五</li>
              <li>城市：北京</li>
            </ul>
            <el-button type="success" plain class="btn " target="_blank" size="small">立即报名</el-button>
          </div>
        </div>
      </div>
    </el-col>
    <!--  <el-col :span="5">
      <div class="grid-content bg-purple-light" style="background-color:blue">
          2222222222222222222222222222222
      </div>
      </el-col>
      <el-col :span="5">
      <div class="grid-content bg-purple" style="background-color:purple">
          333333333333333333333333333333
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple-light" style="background-color:red">
          4444444444444444444444444444444
      </div>
      </el-col> -->
  </el-row>

  <!-- 活动界面 -->
  <!--  <div class="events" :class="{ mobile: isMobile }">
    <ul class="event-list">
      <li class="item" :key="index" :class="{ last: buildLastClass(index) }" v-for="(event, index) in events">
        <a target="_blank" class="item-content" rel="external nofollow noopenter" :href="event.html_url"
          :title="event.description">
          <i class="iconfont" :class="buildIcon(event).icon" :style="{ color: buildIcon(event).color }"></i>
          <h3 class="title">{{ event.name }}</h3>
          <p class="description" style="-webkit-box-orient: vertical;">{{ event.description }}</p>
          <hr>
          <p class="meta">
            <span class="item star">
              <i class="iconfont icon-star"></i>
              <span>{{ event.stargazers_count }}</span>
            </span>
            <span class="item fork">
              <i class="iconfont icon-git-fork"></i>
              <span>{{ event.forks_count }}</span>
            </span>
            <span class="item issues">
              <i class="iconfont icon-git-issue"></i>
              <span>{{ event.open_issues_count }}</span>
            </span>
          </p>
        </a>
      </li>
    </ul>
  </div> -->
</template>

<script>
export default {
  name: 'Events',
  head() {
    return {
      title: `${this.isEnLang ? '' : this.$i18n.nav.project + ' | '}event`
    }
  },
  fetch({ store }) {
    return store.dispatch('events/fetchEvents')
  },
  computed: {
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    },
    events() {
      return this.$store.state.events.events.data
    }
  },
  methods: {
    buildLastClass(index) {
      const events = this.events
      return events.length % 4
        ? index >= (events.length - events.length % 4) // 取余
        : index >= events.length - 4 // 取整
    },
    buildIcon(events) {
      const iconRules = [{
        desc: 'netease',
        icon: 'netease-music',
        color: '#ab3419'
      }, {
        name: 'react',
        desc: 'react',
        color: '#5dd4fa'
      }, {
        name: 'linux',
        color: '#000000'
      }, {
        name: 'deploy',
        icon: 'linux',
        color: '#000000'
      }, {
        name: 'sre',
        icon: 'linux',
        color: '#000000'
      }, {
        name: 'codeif',
        icon: 'think',
        color: '#0088f5'
      }, {
        name: 'emoji',
        color: '#f4c449'
      }, {
        name: 'vue',
        desc: 'vue',
        icon: 'vuejs-gray',
        color: '#62b287'
      }, {
        name: 'chrome',
        color: '#4aa066'
      }, {
        name: 'jquery',
        color: '#8bcdf1'
      }, {
        desc: 'music',
        color: '#ab3419'
      }, {
        name: 'theme',
        color: 'rgb(245, 119, 0)'
      }, {
        name: 'wordpress',
        color: '#24282d'
      }, {
        name: 'javascript',
        color: '#f4c449'
      }, {
        name: 'wallpaper',
        color: '#2c343d'
      }, {
        name: 'node',
        icon: 'nodejs',
        color: '#8dbb39'
      }, {
        name: 'angular',
        icon: 'angularjs',
        color: '#cc3427'
      }, {
        name: 'ngx',
        icon: 'angularjs',
        color: '#cc3427'
      }
      ]

      const isIncludeName = key => events.name.toLowerCase().includes(key)
      const isIncludeDesc = key => events.description.toLowerCase().includes(key)
      const targetRule = iconRules.find(rule => {
        const includeName = rule.name ? isIncludeName(rule.name) : false
        const includeDesc = rule.desc ? isIncludeDesc(rule.desc) : false
        return includeName || includeDesc
      })

      const targetIcon = targetRule
        ? targetRule.icon || targetRule.name || targetRule.desc
        : 'code'

      const defaultColor = 'inherit'
      const targetColor = targetRule ? targetRule.color || defaultColor : defaultColor

      return { icon: `icon-${targetIcon}`, color: targetColor }
    }
  }
}
</script>
<style lang="scss" scoped>
.events {
  .el-col {
    padding-right: 20px;
    width: 25%;
    .widget-event {
      margin-bottom: 20px;
      border: 1px solid #eee;
      background: #f3f3f3;
      //height: 282px;
      border-radius: 2px;
      overflow: hidden;

      .widget-event__meta {
        list-style: none;
        padding: 0;
        margin: 8px 0 0;
        font-size: 13px;
        color: #999;
      }
      .btn {
        position: sticky;
        float: right;
        right: 15px;
        bottom: 15px;
        color: #fff;
        background-color: #009a61;
        border-color: #008151;
      }
      .widget-event__banner {
        height: 150px;
      }
      .title {
        margin: 0;
        font-size: 16px;
        max-height: 45px;
        overflow: hidden;
      }
    }
  }
}

.eveqqqqnts {
  min-height: 40em;

  &.mobile {
    min-height: auto;

    > .event-list {
      > .item {
        width: 100%;
        height: auto;
        float: none;
        flex-grow: 1;
        margin-right: 0;

        &.last {
          margin-bottom: 1rem;
        }

        &:last-child {
          margin: 0;
        }

        > .item-content {
          width: 100%;
          height: auto;

          > .title {
            margin: 1em 0;
          }

          > .iconfont {
            font-size: 3em;
          }

          > .description {
            height: auto;
          }
        }
      }
    }
  }

  > .event-list {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    justify-content: flex-start;

    > .item {
      margin-right: 1rem;
      margin-bottom: 1rem;
      width: 23.9%;
      // height: 23.33rem;

      &.last {
        margin-bottom: 0;
      }

      &:nth-child(4n + 0) {
        margin-right: 0;
      }

      > .item-content {
        display: block;
        width: 100%;
        height: 100%;
        padding: 1rem;
        text-align: center;
        background-color: $module-bg;
        transition: transform 1s, background-color 0.5s;

        &:hover {
          background-color: $module-hover-bg;
          transition: transform 1s, background-color 0.5s;
        }

        > .iconfont {
          display: block;
          height: 1.3em;
          font-size: 6rem;
        }

        > .title {
          @include text-overflow();
          padding: 0 1em;
          margin-bottom: 1.2em;
          font-weight: bold;
          text-transform: capitalize;
        }

        > .description {
          margin-bottom: 1rem;
          text-align: left;
          line-height: 2em;
          text-indent: 1.6em;
          height: 4em;
          overflow: hidden;
          text-overflow: ellipsis;
          @include clamp(2);
        }

        > .meta {
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: space-around;

          > .item {
            font-weight: 400;
            color: $secondary;

            &.star {
              color: $text-light;
              font-weight: bold;
            }

            > .iconfont {
              margin-right: 0.3rem;
            }
          }
        }
      }
    }
  }
}
</style>
