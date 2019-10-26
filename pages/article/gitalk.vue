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
      clientID: '{Your clientID}',
      clientSecret: '{Your clientSecret}',
      repo: 'ibole',
      owner: 'GuoGuang',
      admin: ['GuoGuang'],
      id: location.pathname, // Ensure uniqueness and length less than 50
      distractionFreeMode: false // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')
  }
}
</script>

