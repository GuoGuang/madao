<template>
  <!-- 相关推荐 -->
  <div class="related base">
    <header>相关推荐</header>
    <ul class="pin-list">
      <li class="item">
        <a
          href="/pin/5d25b740e51d456cecc48dbe"
          target="_blank"
          rel=""
          title="###西瓜视频2020年校招提前批###">

          <div class="content">【
          北京】三商聚元网络急切招聘，你来我们就面，每周福利多多
          岗位职责：
          1、使用flutter技术栈开发app，负责公司新产品的功能研发和性能优化
          2、设计良好的代码结构，不断迭代重构，跟进flutter社区技术进展
          3、根据项目任务计划按时完成软件高质量编码和测试工作
          </div>
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'Related',
  props: {

  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.related{
  header{
    color: #2e3135;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.07;
    padding: 13px 16px;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
  }
  .pin-list{
    padding: 0 16px;
    .item{
      border-bottom: 1px solid hsla(0,0%,59.2%,.1);
      padding: 12px 0;
      list-style: none;
      .content{

        color: #2e3135;
        font-size: 1.35rem;
        display: -webkit-box;
        // 参考https://github.com/postcss/autoprefixer/issues/776
        /*! autoprefixer: ignore next */
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        max-height: 3.5rem;
        max-width: 22rem;
      }
    }
  }
}

</style>
