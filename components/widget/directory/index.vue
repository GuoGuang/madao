<template>
  <div>
    <a-anchor :offset-top="55">
      <a-anchor-link
        v-for="(item, index) in tree"
        :key="index"
        :href="'#'+item.id"
        :title="item.name"
      />
    </a-anchor>
  </div>
</template>

<script>
export default {
  name: 'Directory',
  data() {
    return {
      tree: []
    }
  },
  mounted() {
    // 使用演示5ms解决异步获取数据后document.getElementById(Opt.contentEl)为null的问题
    setTimeout(() => {
      const defaultOpts = {
        selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] // 按优先级排序
      }
      const Opt = Object.assign({}, defaultOpts, {
        contentEl: 'article-content',
        catalogEl: 'scroll-aside',
        selector: ['h1', 'h2', 'h3']
      })
      const $content = document.getElementById(Opt.contentEl) // 内容获取区
      const allCatalogs = $content.querySelectorAll(Opt.selector.join())
      const tree = this.getCatalogsTree(allCatalogs)
      this.tree = tree
    }, 500)
  },
  methods: {

    /**
     * 获取目录树，生成类似于Vnode的树
     * @param catalogs
     */
    getCatalogsTree(catalogs) {
      let title
      let tagName
      const tree = []
      let treeItem = {}
      const parentItem = { id: -1 }
      let lastTreeItem = null
      let id
      for (let i = 0; i < catalogs.length; i++) {
        title = catalogs[i].innerText || catalogs[i].textContent
        tagName = catalogs[i].tagName
        id = 'heading-' + i
        catalogs[i].id = id
        treeItem = {
          name: title,
          tagName: tagName,
          id: id,
          level: +this.getLevel(tagName),
          parent: parentItem
        }
        if (lastTreeItem) {
          if (
            this.getLevel(treeItem.tagName) >
            this.getLevel(lastTreeItem.tagName)
          ) {
            treeItem.parent = lastTreeItem
          } else {
            treeItem.parent = this.findParent(treeItem, lastTreeItem)
          }
        }
        lastTreeItem = treeItem
        tree.push(treeItem)
      }
      return tree
    },

    /**
     *  获取等级
     * @param tagName
     * @returns {*}
     */
    getLevel(tagName) {
      return tagName ? tagName.slice(1) : 0
    },

    /**
     * 找到当前节点的父级
     * @param currTreeItem
     * @param lastTreeItem
     * @returns {*|Window}
     */
    findParent(currTreeItem, lastTreeItem) {
      let lastTreeParent = lastTreeItem.parent
      while (
        lastTreeParent &&
        this.getLevel(currTreeItem.tagName) <=
          this.getLevel(lastTreeParent.tagName)
      ) {
        lastTreeParent = lastTreeParent.parent
      }
      return lastTreeParent || { id: -1 }
    }

  }
}
</script>

<style lang="scss">
.ant-anchor-wrapper {
  background-color: inherit;
}
.dic-catalog {
  .cl-link {
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
