<template>
  <!-- 畅言评论 -->
  <div class="comment-box">
    <div id="SOHUCS" :sid="'ddp-blog-'+postId" />
  </div>
</template>
<script>
export default {
  name: 'CommentChangyan',
  props: {
    postId: {
      type: [String, Number],
      required: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      const appid = 'appid'
      const conf = 'your conf'
      this.loadJs('https://changyan.sohu.com/upload/changyan.js', function() {
        window.changyan && window.changyan.api.config({ appid: appid, conf: conf })
      })
    })
  },
  beforeDestroy() {
    try {
      const removeRep = /^http(s)?\:\/\/changyan\./
      const $head = document.getElementsByTagName('head')[0] || document.head || document.documentElement
      const $script = $head.querySelectorAll('script')
      $script.forEach((item, index) => {
        const src = item.getAttribute('src')
        if (src && removeRep.test(src)) {
          $head.removeChild(item)
        }
      })
      for (const key in window) {
        if (/^(changyan(\d)?|cyan)/.test(key)) {
          window[key] = undefined
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  },
  methods: {
    loadJs(url, cb) {
      try {
        const c = document.getElementsByTagName('head')[0] || document.head || document.documentElement
        const b = document.createElement('script')
        b.setAttribute('type', 'text/javascript')
        b.setAttribute('charset', 'UTF-8')
        b.setAttribute('src', url)
        b.setAttribute('id', 'changyan_pc_js')
        if (window.attachEvent) {
          b.onreadystatechange = function() {
            const e = b.readyState
            if (e === 'loaded' || e === 'complete') {
              b.onreadystatechange = null
              cb && cb()
            }
          }
        } else {
          if (cb) {
            b.onload = cb
          }
        }
        c.appendChild(b)
      } catch (error) {
        cb && cb()
      }
    }
  }
}
</script>
<style scoped>
  .comment-box{
    background: #fff;
    padding: 15px
  }
</style>
