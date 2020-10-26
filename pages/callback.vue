<template>
  <div style="margin: 10em;text-align: center;">登录中<span class="dot">...</span></div>
</template>

<script>
export default {
  name: 'Callback',
  async asyncData({ app, query, store, redirect }, callback) {
    return store.dispatch('user/LoginByOauth', query).then((response) => {
      if (response.code === 20000) {
        // 在服务端使用app.$cookies存储cookie到客户端
        app.$cookies.set('Authorization', response.data, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        return redirect('/')
      } else {
        return callback({ statusCode: 501 })
      }
    })
  }
}
</script>

<style scoped>

  .dot {
    font-family: simsun;
  }
  .dot {
    display: inline-block;
    width: 1.5em;
    vertical-align: bottom;
    overflow: hidden;
  }
  @-webkit-keyframes dot {
    0% { width: 0; margin-right: 1.5em; }
    33% { width: .5em; margin-right: 1em; }
    66% { width: 1em; margin-right: .5em; }
    100% { width: 1.5em; margin-right: 0;}
  }
  .dot {
    -webkit-animation: dot 3s infinite step-start;
  }

  @keyframes dot {
    0% { width: 0; margin-right: 1.5em; }
    33% { width: .5em; margin-right: 1em; }
    66% { width: 1em; margin-right: .5em; }
    100% { width: 1.5em; margin-right: 0;}
  }
  .dot {
    animation: dot 3s infinite step-start;
  }
</style>
