<template>
  <div class="index">

    <div class="container">
      <div class="row">
        <div class="hy-layout clearfix">
          <div class="hy-min-screen clearfix">
            <div class="item clearfix" style="display: flex;">
              <dl class="clearfix">
                <dt class="text-muted">按剧情</dt>
                <dd class="clearfix">
                  <a href="?m=/dianying/list.php?cat=all&amp;page=1">全部</a>
                </dd>
              </dl>
              <dl class="cleafix">
                <dt class="text-muted">按年份</dt>
                <dd class="clearfix">
                  <a href="?m=/dianying/list.php?area=all&amp;pageno=1">全部</a>
                </dd>
              </dl>
              <dl class="cleafix hidden-sm">
                <dt class="text-muted">按地区</dt>
                <dd class="clearfix">
                  <a href="?m=/dianying/list.php?area=all&amp;page=1">全部</a>
                </dd>
              </dl>
            </div>
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
                    <router-link to="/movie/1">
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
  components: {
  },
  data() {
    return {
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
    loadmoreArticle() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    },
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
  .hy-index-menu{
    *, *:hover {
      &:after, &:before {
        display: none;
      }
    }
  }
.container{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
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
</style>

<style lang="scss">

  .custom-tabs {
    .el-tabs__item {
      color: #204060 !important;
    }
      .el-tabs__item {
        color: #204060 !important;
      }
    .el-tabs__active-bar{
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
