<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          Copyright © 2019-{{ currentYear }} <a class="sitemap-btn" href="/" target="_blank">码道人生</a >
          All Rights Reserved. <br><a class="sitemap-btn" href="http://www.beian.miit.gov.cn/" target="_blank">鲁ICP备20026257号</a ><br>
          <a href="" rel="nofollow"/> &nbsp;
          <p class="ml5">网站在各种灾难中运行了 <span>{{ days }}</span> 天</p >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MobileFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    days() {
      var old = new Date('2019-12-01')
      var n = new Date()
      var s = n - old
      return Math.floor(s / (24 * 3600 * 1000))
    }
  }
}
</script>

<style lang="scss" scoped>
  footer {
    margin: 0;
    padding: inherit;
    height: inherit;
    background-color: $module-bg;

    .container {
      width: 100%;
      position: relative;

      .footer-content {
        padding: 1rem;
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
