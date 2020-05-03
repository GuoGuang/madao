<template>
  <div class="aside-tag">
    <empty-box v-if="!tags.length">
      <slot>{{ $i18n.text.tag.empty }}</slot>
    </empty-box>
    <ul v-else class="aside-tag-list">
      <nuxt-link v-for="(tag, index) in tags" :key="index" :to="`/tag/${tag.id}`" tag="li" class="item">
        <a :title="tag.description" :style="{'background-color': tag.color}" class="title">
          <!-- <i class="iconfont" :class="tag.extends.find(t => Object.is(t.name, 'icon')).value"
                v-if="tag.extends.find(t => Object.is(t.name, 'icon'))"></i> -->
          <i :class="tag.icon" class="iconfont"/>
          <span>{{ isEnLang ? tag.slug : tag.name }}</span>
          <span>({{ tag.tagsCount || 0 }})</span>
        </a>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'PcAside',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    ...mapState({
      tags: state => state.tag.data
    })
  }

}
</script>

<style lang="scss" scoped>
$aside-width: 20em;
.aside-tag {
  max-height: calc(100vh - 8em - 4.5em - 3em - 8em);
  overflow-y: auto;
}

.aside-tag {
  width: $aside-width;
  padding-left: 1rem;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  margin-bottom: 1em;

  .empty-box {
    padding-right: 0.8em;
    padding-bottom: 0.8em;
  }

  .aside-tag-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;

    .item {
      display: inline-block;
      margin-right: 1rem;
      margin-bottom: 1rem;
      height: 2em;
      line-height: 2em;
      text-transform: capitalize;
      background-color: $module-hover-bg;

      &:hover {
        background-color: $module-hover-bg-darken-40;
      }

      &:last-child {
        margin: 0;
      }

      .title {
        display: block;
        padding: 0 0.5em;
        font-family: $sans-serif;
      }
    }
  }
}
</style>

