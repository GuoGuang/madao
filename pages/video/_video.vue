<template>
  <div class="index">
    <div class="container">
      <div class="row">

        <div class="hy-layout clearfix" style="display: flex;">

          <el-carousel height="100%" style="width: 60%;">
            <el-carousel-item key="0">
              <el-image
                src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                fit="fill"/>
            </el-carousel-item>
            <el-carousel-item key="1">
              <el-image
                src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                fit="fill"/>
            </el-carousel-item>
            <el-carousel-item key="2">
              <el-image
                src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"
                fit="fill"/>
            </el-carousel-item>
            <el-carousel-item key="3">
              <el-image
                src="https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
                fit="fill"/>
            </el-carousel-item>
            <el-carousel-item key="4">
              <el-image
                src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
                fit="fill"/>
            </el-carousel-item>
            <el-carousel-item key="5">
              <el-image
                src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
                fit="fill"/>
            </el-carousel-item>
          </el-carousel>
          <div class="">
            <div class="hy-index-menu clearfix">
              <div class="item">
                <ul class="clearfix">
                  <li><a href="#" @click="toList()"><i class="icon iconfont icon-zhibo  text-color"/><span>电视直播</span></a>
                  </li>
                  <li><a href="./vlist.php?cid=0"><i
                    class="icon iconfont icon-vip text-color"/><span>抢先片源</span></a></li>
                  <li><a href="#" @click="toList()"><i
                    class="icon iconfont icon-tv_icon text-color"/><span>剧集</span></a></li>
                  <li><a href="#" @click="toList()"><i class="icon iconfont icon-tubiaozhizuomobanyihuifu- text-color"/><span>会员中心</span></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="hy-index-tags hidden-md clearfix">
              <div class="item">
                <ul class="clearfix">
                  <li><a href="#" @click="toList()">爱情</a></li>
                  <li><a href="#" @click="toList()">动作</a></li>
                  <li><a href="#" @click="toList()">恐怖</a></li>
                  <li><a href="#" @click="toList()">科幻</a></li>
                  <li><a href="#" @click="toList()">剧情</a></li>
                  <li><a href="#" @click="toList()">犯罪</a></li>
                  <li><a href="#" @click="toList()">奇幻</a></li>
                  <li><a href="#" @click="toList()">战争</a></li>
                </ul>
              </div>
            </div>
            <div class="hy-right-qrcode hidden-sm hidden-xs">
              <div class="item">
                <dl class="clearfix" style="display:table;content:'';width: 100%;">
                  <dt><img src=""></dt>
                  <dd><h4>扫描二维码“手机看大片”</h4>
                    <p class="text-muted"> 也可以分享到朋友圈哦！ </p>
                  <p class="margin-0 text-muted"> https://codeway.me/video/ </p></dd>
                </dl>
              </div>
            </div>
          </div>

        </div>

        <!--公告-->
        <div class="container hidden-xs">
          <div class="row">
            <div class="hy-layout clearfix">
              <li class="active">
                <table border="0" width="100%">
                  <tbody>
                    <tr>
                      <td width="22" height="22"><img src="https://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/notice.png" width="22" height="22"></td>
                      <td><strong>
                        <marquee
                          scrollamount="8"
                          direction="left"
                          align="Middle"
                          style="padding-right:20px;">公告：欢迎光临CODEWAY影院，本站不投放广告，如有广告，请自行切换线路！
                        </marquee>
                      </strong></td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </div>
          </div>
        </div><!--公告--><!--抢先看-->
        <div class="container">
          <div class="row" style="margin-top:10px"/>
        </div> <!--电影-->
        <div class="hy-layout clearfix">
          <div class="hy-video-head">
            <ul class="pull-right">
              <li class="text-muted hidden-md hidden-sm hidden-xs">
                <a href="./movie.php?m=/dianying/list.php?cat=103&amp;page=1" class="text-muted border-right">喜剧</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./movie.php?m=/dianying/list.php?cat=100&amp;page=1"
                class="text-muted border-right">爱情</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./movie.php?m=/dianying/list.php?cat=106&amp;page=1"
                class="text-muted border-right">动作</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./movie.php?m=/dianying/list.php?cat=102&amp;page=1"
                class="text-muted border-right">恐怖</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./movie.php?m=/dianying/list.php?cat=104&amp;page=1"
                class="text-muted border-right">科幻</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./movie.php?m=/dianying/list.php?cat=121&amp;page=1"
                class="text-muted border-right">剧情</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./movie.php?m=/dianying/list.php?cat=105&amp;page=1"
                class="text-muted border-right">犯罪</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./movie.php?m=/dianying/list.php?cat=113&amp;page=1"
                class="text-muted border-right">奇幻</a>
                /
              </li>
              <li class="active"><a href="./movie.php?m=/dianying/list.php?cat=all&amp;page=1" class="text-muted">更多 ❯</a></li>
            </ul>
            <h3 class="margin-0"><i class="icon iconfont icon-caidanicondianyinghui text-color"/>

          <span style="align-self: center;">电影</span></h3></div>
        </div>        <!--电影-->
        <div class="container">
          <div class="row" style="margin-top:10px"/>
        </div> <!--剧集-->
        <div class="hy-layout clearfix">
          <div class="hy-video-head">
            <ul class="pull-right">
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=101&amp;pageno=1"
                class="text-muted border-right">言情</a> /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=105&amp;pageno=1"
                class="text-muted border-right">伦理</a> /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=109&amp;pageno=1"
                class="text-muted border-right">喜剧</a> /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=108&amp;pageno=1"
                class="text-muted border-right">悬疑</a> /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=111&amp;pageno=1"
                class="text-muted border-right">都市</a> /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=100&amp;pageno=1"
                class="text-muted border-right">偶像</a> /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=104&amp;pageno=1"
                class="text-muted border-right">古装</a> /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./tv.php?m=/dianshi/list.php?cat=107&amp;pageno=1"
                class="text-muted border-right">军事</a> /
              </li>
              <li class="active"><a href="#" class="text-muted" @click="toList()">更多 ❯</a></li>
            </ul>
            <h3 class="margin-0"><i class="icon iconfont icon-tv_icon text-color"/>

          <span style="align-self: center;">剧集</span></h3></div>
        </div>        <!--剧集--> <!--综艺-->
        <div class="container">
          <div class="row" style="margin-top:10px"/>
        </div>
        <div class="hy-layout clearfix">
          <div class="hy-video-head">
            <ul class="pull-right">
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right"
                @click="toList()">选秀</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right"
                @click="toList()">八卦</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right"
                @click="toList()">访谈</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right"
                @click="toList()">情感</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right"
                @click="toList()">生活</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right"
                @click="toList()">晚会</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right"
                @click="toList()">搞笑</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="#"
                class="text-muted border-right">音乐

                <span style="align-self: center;">综艺</span>
              </a>
                /
              </li>
              <li class="active"><a href="./zongyi.php?m=/zongyi/list.php?cat=all&amp;page=1" class="text-muted">更多 ❯</a></li>
            </ul>
            <h3 class="margin-0">
              <i class="icon iconfont icon-jiemu text-color"/>
              <span style="align-self: center;">综艺</span>
            </h3>
          </div>
        </div>        <!--综艺--> <!--动漫-->
        <div class="container">
          <div class="row" style="margin-top:10px"/>
        </div>
        <div class="hy-layout clearfix">
          <div class="hy-video-head">
            <ul class="pull-right">
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=100&amp;page=1"
                class="text-muted border-right">热血</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=101&amp;page=1"
                class="text-muted border-right">恋爱</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=102&amp;page=1"
                class="text-muted border-right">美少女</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=103&amp;page=1"
                class="text-muted border-right">运动</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=104&amp;page=1"
                class="text-muted border-right">校园</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=105&amp;page=1"
                class="text-muted border-right">搞笑</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=106&amp;page=1"
                class="text-muted border-right">幻想</a>
                /
              </li>
              <li class="text-muted hidden-md hidden-sm hidden-xs"><a
                href="./dongman.php?m=/dongman/list.php?cat=107&amp;page=1"
                class="text-muted border-right">冒险</a>
                /
              </li>
              <li class="active"><a
                href="./dongman.php?m=/dongman/list.php?cat=all%26pageno=1"
                class="text-muted">更多 ❯</a></li>
            </ul>
            <h3 class="margin-0"><i class="icon iconfont icon-liebiaodaohang_dongman text-color"/>

          <span style="align-self: center;">动漫</span></h3></div>
        </div>        <!--动漫--> <!--合作伙伴-->
        <div class="hy-layout hidden-md hidden-sm hidden-xs clearfix" style="margin-bottom: 20px;">
          <div class="hy-video-head"><h3 class="margin-0">合作伙伴</h3></div>
          <div class="hy-footer-partner" style="height: 150px;">
            <div class="item clearfix"><a href="http://www.iqiyi.com/" target="_blank" class="iqiyi"><span/></a><a
              href="http://www.letv.com/"
              target="_blank"
              class="letv"><span/></a><a
                href="http://www.wasu.cn/"
                target="_blank"
                class="wasu"><span/></a><a
                  href="http://www.fun.tv/"
                  target="_blank"
                  class="fun"><span/></a><a
                    href="http://www.hunantv.com/"
                    target="_blank"
                    class="hunantv"><span/></a><a
                      href="http://www.cntv.cn/"
                      target="_blank"
                      class="cntv"><span/></a><a
                        href="http://v.ifeng.com/"
                        target="_blank"
                        class="ifeng line-last"><span/></a><a
                          href="http://www.pptv.com/"
                          target="_blank"
                          class="pptv"><span/></a><a
                            href="http://www.kankan.com/?id=731032"
                            target="_blank"
                            class="kankan"><span/></a><a
                              href="http://www.56.com/"
                              target="_blank"
                              class="v56"><span/></a><a
                                href="http://www.ku6.com/"
                                target="_blank"
                                class="ku6"><span/></a><a
                                  href="http://www.1905.com/"
                                  target="_blank"
                                  class="m1905"><span/></a><a
                                    href="http://www.cztv.com/"
                                    target="_blank"
                                    class="sina"><span/></a><a
                                      href="http://www.yinyuetai.com/"
                                      target="_blank"
                                      class="yinyuetai line-last"><span/></a></div>
          </div>
        </div><!--end 合作伙伴 -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Video',
  components: {
  },
  data() {
    return {
    }
  },
  fetch({ store, params }) {
    // return store.dispatch('article/fetchList', params)
  },
  head() {
    return {
      title: `影视 | 在线免费高清电影`
    }
  },
  computed: {
  },
  methods: {
    loadmoreArticle() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    },
    toList() {
      this.$router.push(`/video/list`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../static/video/css/iconfont.css';
  @import '../../static/video/css/style.min.css';
  @import '../../static/video/css/whitecolor.css';
  .hy-index-menu{
    *, *:hover {
      &:after, &:before {
        display: none;
      }
    }
  }
  .hy-video-head h3 {
    display: flex !important;
    font-size: 18px;
  }
</style>
