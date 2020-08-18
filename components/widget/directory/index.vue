<template>
  <!-- 文章右侧目录区 Ref:https://github.com/SHERlocked93/progress-catalog-->
  <div
    id="scroll-aside"
    class="aside-fixed-box dic-catalog"
  />
</template>

<script>
import Catalog from './progress-catalog'
export default {
  name: 'Directory',
  data() {
    return {}
  },
  mounted() {
    setTimeout(() => {
      new Catalog({
        contentEl: 'article-content',
        catalogEl: 'scroll-aside',
        selector: ['h1', 'h2'],
        bottomMargin: 100
      })
    }, 500)
  }
}
</script>

<style lang="scss">
  .dic-catalog {
    .cl-link{
      line-height: 2em;
    }
    .cl-wrapper {
      position: relative;
    }

    .cl-wrapper ul,
    .cl-wrapper li {
      margin: 0;
      -moz-padding-start: 12px;
      -webkit-padding-start: 12px;
      list-style: none;
    }

    .cl-wrapper li > .cl-link.cl-link-active {
      color: #1485fe;
      transition: 0.5s;
    }

    .cl-wrapper li > .cl-transform.cl-link-active {
      transform: translate(3px);
    }

    .cl-wrapper .cl-link {
      cursor: pointer;
      color: rgba(52, 73, 94, 0.5);
      font-size: 13px;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .cl-wrapper .cl-marker {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .cl-wrapper .cl-marker path {
      transition: all 0.3s ease;
    }
  }
</style>
