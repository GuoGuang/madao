<template>
  <div class="gitalk-container">
    <div id="gitalk-container"/>
  </div>
</template>
<script>

import 'gitalk/dist/gitalk.css' // 使用 gitalk 插件
import Gitalk from 'gitalk'

export default {
  name: 'Comment',
  data() {
    return {}
  },
  mounted() {
    const body = document.querySelector('.gitalk-container')
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js'
    body.appendChild(script)
    script.onload = () => {
      const commentConfig = {
        clientID: 'd7b4d785014297b37d96',
        clientSecret: 'b0b5ebf93371e5050b1b1898e040dbaf57cc7e23',
        repo: 'youyd', // 此仓库的名称
        owner: 'GuoGuang0536', // 你的 GitHub 用户名，注意是用户名！！！
        // 这里接受一个数组，可以添加多个管理员
        admin: ['GuoGuang0536'], // 你的 GitHub 用户名
        default: true,
        // id 用于当前页面的唯一标识，一般来讲 pathname 足够了，

        // 但是如果你的 pathname 超过 50 个字符，GitHub 将不会成功创建 issue，此情况以考虑给每个可页面生成 hash 值的方法.
        id: decodeURI(location.pathname),
        // createIssueManually: true,
        distractionFreeMode: false
      }
      const gitalk = new Gitalk(commentConfig)
      gitalk.render('gitalk-container')
    }
  }
}
</script>

