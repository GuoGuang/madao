<template>
  <div id="tool-left">
    <div class="tool-box">
      <div
        :class="language"
        class="item language"
        title="Switch language"
        @click="tooggleLanguage"
      >{{ language }}</div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import systemConstants from '~/constants/system'
export default {
  name: 'LanguagePsm',
  computed: {
    ...mapState('global', ['language']),
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    }
  },
  methods: {
    tooggleLanguage() {
      this.$ga.event('系统语言', '切换', 'tool')
      this.$store.commit(
        'global/updateLanguage',
        this.isEnLang ? systemConstants.Language.Zh : systemConstants.Language.En
      )
    }
  }
}
</script>

<style lang="scss" scoped>

  @keyframes tool-left-item {
    0%  { transform: translateX(-1rem) }
    50% { transform: translateX(-3rem) }
    100% { transform: translateX(-1rem) }
  }

  #tool-left {
    position: fixed;
    left: 0;
    top: 50%;

    > .tool-box {
      width: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:hover {

        > .item {
          transform: translateX(0)!important;
          animation: none;
        }
      }

      > .item {
        width: 4rem;
        height: 2.6rem;
        line-height: 2.6rem;
        text-align: center;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;
        color: $white;
        font-size: $font-size-small;
        position: relative;
        animation: tool-left-item 1s infinite;
        transition: transform .15s;

        &.power {
          animation-delay: .5s;
        }

        &.language {

          &:before {
            content: 'LANG';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity .25s;
          }

          &:hover {
            &:before {
              opacity: 1;
            }
          }

          $enBG: rgb(0, 43, 127);
          $zhBG: #F40002;

          &.en {
            background: linear-gradient(to bottom left, rgba($enBG, .6), $enBG);

            &:hover {
              &:before {
                background: linear-gradient(to bottom left, $zhBG, $enBG);
              }
            }
          }

          &.zh {
            background: linear-gradient(to bottom right, rgba($zhBG, .6), $zhBG);

            &:hover {
              &:before {
                background: linear-gradient(to bottom left, $enBG, $zhBG);
              }
            }
          }
        }

        &.power {
          $powerBG: #50a849;

          &.on {
            background-color: rgba($powerBG, .7);
          }

          &.off {
            background-color: rgba($powerBG, .7);
          }

          &:before {
            content: 'PSM';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba($powerBG, 1);
            opacity: 0;
            transition: opacity .25s;
          }

          &:hover {
            &:before {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
