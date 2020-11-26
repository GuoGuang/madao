<template>
  <div class="index">

    <div class="container">
      <div class="row">

        <div class="cation-content">
          <div class="cation-middle">
            <dl class="cation-list">
              <dt>分类</dt>
              <dd>
                <a :class="{'on':isCurrentType == -1}" href="#" rel="" name="mode" class="all" @click="isCurrentType = -1">全部</a>
                <a
                  v-for="(item,index) in type"
                  :key="index"
                  :rel="item"
                  :class="{'on':isCurrentType === index}"
                  href="#"
                  name="mode"
                  class="default"
                  @click="isCurrentType = index">{{ item }}</a>
              </dd>
            </dl>
            <dl class="cation-list">
              <dt>地区</dt>
              <dd>
                <a :class="{'on':isCurrentArea == -1}" href="#" rel="" name="mode" class="all" @click="isCurrentArea = -1">全部</a>
                <a
                  v-for="(item,index) in area"
                  :key="index"
                  :rel="item"
                  :class="{'on':isCurrentArea === index}"
                  href="#"
                  name="mode"
                  class="default"
                  @click="isCurrentArea = index">{{ item }}</a>
              </dd>
            </dl>
            <dl class="cation-list">
              <dt>年份</dt>
              <dd>
                <a :class="{'on':isCurrentYear == -1}" href="#" rel="" name="mode" class="all" @click="isCurrentYear = -1">全部</a>
                <a
                  v-for="(item,index) in year"
                  :key="index"
                  :rel="item"
                  :class="{'on':isCurrentYear === index}"
                  href="#"
                  name="mode"
                  class="default"
                  @click="isCurrentYear = index">{{ item }}</a>
              </dd>
            </dl>
          </div>
        </div>

        <div class="container">
          <div class="row" style="margin-top:0px"/>
        </div>
        <div class="hy-layout clearfix" style="margin-top: 10px;">
          <div style="position: absolute;right: 20px;display: flex;line-height: 2;">如果您喜欢本站请动动小手分享给您的朋友！</div>
          <el-tabs value="first" class="custom-tabs" style="color: #204060" @tab-click="handleClick">
            <el-tab-pane label="按最热" name="first">

              <el-row>
                <el-col v-for="(item,key) in movies" :span="6" :key="key" >
                  <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <router-link :to="{ path: `/movie/${item.id}`, query: { item: JSON.stringify(item) }}" >
                      <el-image :src="item.cover_pic" fit="cover" class="custom-img" lazy style="width:100%;height: 400px;"/>
                    </router-link>
                    <div style="padding: 14px;">
                      <p >{{ item.name }}</p>
                      <div style="display:flex;justify-content: space-between;">
                        <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.desc }}</span>
                        <el-tag
                          type="info"
                          effect="plain">
                          {{ new Date().getFullYear() }}
                        </el-tag>

                      </div>

                    </div>
                  </el-card>
                </el-col>
              </el-row>

            </el-tab-pane>
            <el-tab-pane label="按最新" name="second">按最新</el-tab-pane>
            <el-tab-pane label="按好评" name="third">按好评</el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VideoList',
  components: {},
  data() {
    return {
      type: ['魔幻/科幻', '灵异/惊悚', '都市/情感', '犯罪/历史', '选秀/综艺', '动漫/卡通'],
      area: ['美国', '英国', '法国', '意大利', '俄罗斯'],
      year: ['2020', '2019', '2018', '2017', '2016'],
      isCurrentType: -1,
      isCurrentArea: -1,
      isCurrentYear: -1
    }
  },
  fetch({ store, params }) {
    return store.dispatch('movie/fetchList')
  },
  head() {
    return {
      title: `影视 | 在线免费高清电影`
    }
  },
  computed: {
    movies() {
      return this.$store.state.movie.list.data
    }
  },
  methods: {
    /* loadMoreArticle() {
        this.$store.dispatch('article/fetchList', this.nextPageParams)
      },*/
    handleClick() {
      console.log('handleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../static/movie/css/iconfont.css';
  @import '../../static/movie/css/style.min.css';
  @import '../../static/movie/css/whitecolor.css';

  .hy-index-menu {
    *, *:hover {
      &:after, &:before {
        display: none;
      }
    }
  }

  .container {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 14px;
    line-height: 1.42857143;
    color: #666;
    font-family: "Microsoft YaHei";
    box-sizing: border-box;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  /*切换卡*/
  .hy-switch-tabs {
    margin-top: 0;
    padding: 0 5px;
  }

  .hy-switch-tabs.active {
    margin-bottom: 10px;
  }

  .hy-switch-tabs .nav-tabs {
    padding: 0;
  }

  .hy-switch-tabs .nav-tabs ul {
    padding: 0;
  }

  .hy-switch-tabs .nav-tabs li {
    margin: 0 30px -2px 0;
  }

  .hy-switch-tabs .nav-tabs li a {
    display: inline-block;
    padding: 10px 0;
    font-size: 14px;
  }

  .cation-content {
    margin: 0 auto;
    padding: 0;

    .clearfix::after {
      clear: both;
      content: ".";
      display: block;
      height: 0;
      visibility: hidden;
    }

    .clearfix {
    }

    .cation-middle {
      line-height: 48px;
      background: #fff;
      padding: 10px 20px 10px 30px;
      font-size: 14px;
    }

    .cation-list {
      overflow: hidden;
    }

    .cation-list dt {
      float: left;
      width: 64px;
      font-weight: 700;
      line-height: 48px;
      position: relative;
      color: #204060;
    }

    :before, :after {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .cation-list dt:after {
      content: "";
      position: absolute;
      right: 12px;
      top: 22px;
      border: 1px solid #333;
      border-width: 0 1px 1px 0;
      width: 4px;
      height: 4px;
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    .cation-list dd {
      border-bottom: 1px dotted #e0e0e0;
      margin-left: 64px;
      overflow: hidden;
    }

    .cation-list dd a {
      color: #204060;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      float: left;
      border-right: 1px solid #e0e0e0;
      padding: 0 18px;
      margin: 17px 0;
    }

    .cation-list dd a.on, .cation-list a:hover {
      color: #fc8080;
    }

    .cation-list dd a:last-child {
      border-right: 0 none;
    }
    dl:last-child {
      margin-bottom: 0;
    }

    .cation-list:last-of-type dd {
      border-bottom: 0 none;
    }
  }
</style>

<style lang="scss">

  .custom-tabs {
    .el-tabs__item {
      color: #204060 !important;
    }

    .el-tabs__item {
      color: #204060 !important;
    }

    .el-tabs__active-bar {
      background-color: #204060 !important;
    }
  }

  .custom-img img {
    transition: all 0.6s;
  }

  .custom-img img:hover {
    transform: scale(1.1);
  }
</style>
