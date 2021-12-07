<template>
  <div class="gitalk-container">
    <div id="gitalk-container"/>
  </div>
</template>
<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
export default {
  name: 'Gitalk',
  data() {
    return {}
  },
  mounted() {
    const gitalk = new Gitalk({
      clientID: '8a3073a44899f1576f1d',
      clientSecret: 'd34184cb4bcb6883ea4cdb13d80ed509adda6bc5',
      repo: 'comments',
      owner: 'jackonli-Eils',
      admin: ['jackonli-Eils'],
      id: location.pathname.match('[^/]+(?!.*/)')[0], // /后面的id
      distractionFreeMode: false // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')
  }
}
</script>

