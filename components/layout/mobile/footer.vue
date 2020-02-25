<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          Copyright © 2018-2020 <br>codeif.me博客<br>
          <a href="" rel="nofollow"/> &nbsp;
          <span class="ml5">网站在各种灾难中运行了 {{ days }} 天</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MobileFooter',
  computed: {
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
    padding: 1rem 0;
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
  }
</style>
