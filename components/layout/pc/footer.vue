<template>
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer-content">
        <a class="sitemap-btn" href="#" v-text="$i18n.nav.map">SITEMAP.XML</a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>

        <span v-if="isEnLang">
          <span>Powered By</span>
          <nuxt-link to="/project">Nuxt.js</nuxt-link>
          <span>and solitarily.</span>
          <span>&nbsp; Designed By</span>
          <nuxt-link to="/about">Me</nuxt-link>
        </span>

        <span v-else>
          <span>由&nbsp;</span>
          <a class="sitemap-btn" href="https://nuxtjs.org/" target="_blank">Nuxt.js</a>
          <span>&nbsp;和&nbsp;日月星辰&nbsp;强力驱动&nbsp;</span>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <nuxt-link to="/about">吾之臂躯</nuxt-link>
          <span>&nbsp;行针步线</span>
        </span>
      </div>
      <div class="copyright">
        Copyright © 2019-{{ currentYear }} <a class="sitemap-btn" href="/" target="_blank">码道人生</a >
        All Rights Reserved. <a class="sitemap-btn" href="http://www.beian.miit.gov.cn/" target="_blank">鲁ICP备20026257号</a ><br>
        <a href="" rel="nofollow"/> &nbsp;
        <p class="ml5">网站在各种灾难中运行了 <span>{{ days }}</span> 天</p >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PcFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    isEnLang() {
      return this.$store.state.global.isEnLang
    },
    days() {
      const old = new Date('2019-12-01')
      const n = new Date()
      const s = n - old
      return Math.floor(s / (24 * 3600 * 1000))
    }
  }
}
</script>

<style lang="scss" scoped>
  footer {
    margin-top: 1em;
    background-color: $module-bg;
    .container {
      position: relative;
      .footer-content {
        padding: 1em;
        font-size: .9em;
        text-align: center;
        text-transform: uppercase;
      }
    }
    p {
      margin-bottom: 1em;
      span {
        font-style: italic;
        font-family: monospace;
        font-weight: bold;
      }
    }
  }

</style>

<style>
html{height:100%;}
body{min-height:100%;position:relative;}
main{padding-bottom:200px;}/* main的padding-bottom值要等于或大于footer的height值 */
footer{position:absolute;bottom:0;width:100%;height:130px;}
</style>
