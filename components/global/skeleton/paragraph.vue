<template>
  <div :style="style" class="skeleton paragraph">
    <skeleton-line
      v-for="(line, index) in lines"
      :key="index"
      :style="getLineStyle(index)"
      class="paragraph-line"
    />
  </div>
</template>

<script>
import SkeletonLine from './line'
export default {
  name: 'SkeletonParagraph',
  components: {
    SkeletonLine
  },
  props: {
    lines: {
      type: Number,
      default: 1
    },
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
    },
    align: {
      type: Boolean,
      default: false
    },
    lineHeight: {
      type: String,
      default: '1rem'
    }
  },
  computed: {
    style() {
      const style = {}
      if (this.width) {
        style.width = this.width + 'px'
      }
      if (this.height) {
        style.height = this.height + 'px'
      }
      return style
    }
  },
  methods: {
    getLineStyle(index) {
      const style = {
        height: this.lineHeight,
        marginBottom: index === this.lines - 1
          ? '0'
          : `calc(${this.lineHeight} * 0.75)`
      }
      const pos = index % 3
      if (pos) {
        const margin = 15 * pos
        style.width = `${100 - margin}%`
        style.marginLeft = this.align ? '0' : '6%'
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

