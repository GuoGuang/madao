<template>
  <div
    :style="{ transform: `rotate(-60deg) translateY(${left}%)` }"
    :class="{
      gray: gray,
      [color || '']: true,
      'border-left': border === 'left',
      'border-right': border === 'right'
    }"
    class="color-block-box"
  />
</template>

<script>
export default {
  name: 'ColorBlockBox',
  props: {

    gray: {
      type: Boolean,
      default: true
    },
    left: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: ''
    },
    border: {
      type: String,
      default: 'right'
    }
  }
}
</script>

<style lang="scss">
  .color-block-box {
    z-index: -1;
    position: absolute;
    display: flex;
    width: 100%;
    padding-bottom: 50%;

    &.border-right {
      border-bottom-width: 1rem;
      border-bottom-style: solid;
    }

    &.border-left {
      border-top-width: 1rem;
      border-top-style: solid;
    }

    &.primary {
      background-color: $primary;
      border-color: $accent;
    }

    &.accent {
      background-color: $accent;
      border-color: $red;
    }

    &.red {
      background-color: $red;
      border-color: $accent;
    }

    &.gray {
      opacity: .7;
      // filter: grayscale(100%);
      // background-color: #888888;
      border-color: #b5b5b5;
      background: linear-gradient(90deg, $theme-black 0%, $theme-black 50%, $module-bg 90%);
    }
  }
</style>
