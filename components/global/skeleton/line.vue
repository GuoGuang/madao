<template>
  <div :style="style" class="skeleton line">
    <skeleton-base />
  </div>
</template>

<script>
import SkeletonBase from './base'
export default {
  name: 'SkeletonLine',
  components: {
    SkeletonBase
  },
  props: {
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
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
  }
}
</script>

<style lang="scss" scoped>
  .skeleton.line {
    width: 100%;
    height: 100%;
  }
</style>
