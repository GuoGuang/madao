<template>
  <footer id="footer" class="footer">
    <el-row class="footer-row" >
      <el-col :span="6">
        <dl class="site-link">
          <dt>产品</dt>
          <dd><a href="">热门文章</a></dd>
          <dd><a href="">热门专栏</a></dd>
          <dd><a href="">猿圈</a></dd>
        </dl>
      </el-col>
      <el-col :span="6">
        <dl class="site-link">
          <dt>商务</dt>
          <dd><a href="" target="_blank">人才服务</a></dd>
          <dd><a href="" target="_blank">广告投放</a></dd>
          <dd><a href="" target="_blank">合作联系</a></dd>
        </dl>
      </el-col>
      <el-col :span="6">
        <dl class="site-link">
          <dt>合作</dt>
          <dd><a href="">广告投放</a></dd>
        </dl>
      </el-col>
      <el-col :span="6">
        <dl class="site-link">
          <dt>关注</dt>
          <dd><a href="" target="_blank">产品技术日志</a></dd>
          <dd>
            <ul class="sn-inline">
              <li>
                <a class="entypo-wechart" href="" >
                  <svg class="icon" aria-hidden="true" style="width: 25px;height: 25px;">
                    <use xlink:href="#icon-weixin"/>
                  </svg>
                </a>
              </li>
              <li>

                <a href="" target="_blank" class="entypo-weibo icon-sn-weibo">
                  <svg class="icon" aria-hidden="true" style="width: 25px;height: 25px;">
                    <use xlink:href="#icon-qq"/>
                  </svg>
                </a>
              </li>
              <li>
                <svg class="icon" aria-hidden="true" style="width: 25px;height: 25px;">
                  <use xlink:href="#icon-github"/>
                </svg>
                <a href="" target="_blank" class="entypo-facebook icon-sn-github"/>
              </li>

            </ul>
          </dd>
        </dl>
      </el-col>

    </el-row>

    <el-row >
      <el-col :span="24" >
        <div class="copyright">
          Copyright © 2019-2019 Excloud.im博客<br>
          <a href="" rel="nofollow"/> &nbsp;
          <span class="ml5">GuoGuang</span>
          <!-- <p class="mt30">CDN 存储服务由 <a target="_blank" href="">又拍云</a> 赞助提供 </p> -->
        </div>
      </el-col>
    </el-row>
  </footer>
</template>

<script>
export default {
  name: 'PcFooter',
  computed: {
    isEnLang() {
      return this.$store.state.global.isEnLang
    }
  }
}
</script>

<style lang="scss" scoped>
  footer {
    height: 180px;
        .footer-row{
          margin: 0 auto;
          width: 100%;
        }
    .site-link{
      text-align: left;
      dt{
        margin-bottom: 20px;
        color: #333;
        font-weight: bold;
        margin-bottom: 20px;
        dd{
          margin-left: 0;
          line-height: 1.42858;
          //margin-left: 2em;
          a{
            color: #888;
          }
        }
      }
      .sn-inline{
        li{
          display: inline-block;
        }
      }

    }
    margin-top: 1em;
    background-color: $module-bg;
    .copyright{

    }
    dl{
          padding-left: 8em;
    }
  }

</style>
