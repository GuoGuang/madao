<template>
  <div :style="{ height: height + 'px' }" class="page">
    <div class="player">
      <button :disabled="!playerState.ready" class="prev-song" @click="prevSong">
        <i class="iconfont icon-music-prev"/>
      </button>
      <div class="album-box">
        <div class="circle-progress">
          <svg viewBox="0 0 100 100">
            <path
              :d="trackPath"
              :stroke-width="relativeStrokeWidth"
              class="circle-progress-circle-track"
              stroke="rgba(197, 197, 197, 0.4)"
              fill="none"
            />
            <path
              :d="trackPath"
              :stroke-width="relativeStrokeWidth"
              :style="circlePathStyle"
              class="circle-progress-circle-path"
              stroke="rgba(190, 190, 190, 0.7)"
              stroke-linecap="bevel"
              fill="none"
            />
          </svg>
        </div>
        <div :class="{ 'playing': playerState.playing }" class="song-bg-box">
          <img :src="currentSongPicUrl">
        </div>
        <div class="toggle-box">
          <transition name="module" mode="out-in">
            <button
              v-if="playerState.playing"
              key="pause"
              :disabled="!playerState.ready"
              class="toggle-btn"
              @click="togglePlay"
            >
              <i class="iconfont icon-music-pause"/>
            </button>
            <button
              v-else
              key="play"
              :disabled="!playerState.ready"
              class="toggle-btn"
              @click="togglePlay"
            >
              <i class="iconfont icon-music-play"/>
            </button>
          </transition>
        </div>
        <div class="toggle-muted">
          <button :disabled="!playerState.ready" class="muted-btn" @click="toggleMuted">
            <i :class="playerState.muted ? 'icon-music-muted' : 'icon-music-volume'" class="iconfont"/>
          </button>
        </div>
      </div>
      <button :disabled="!playerState.ready" class="next-song" @click="nextSong">
        <i class="iconfont icon-music-next"/>
      </button>
    </div>
    <div class="song-info">
      <h3 class="name">
        <span v-if="currentSong">
          <span>{{ currentSong.name }}</span>
          <span>By</span>
          <span v-for="(artist, index) in currentSong.artists" :key="index">{{ artist.name }}</span>
          <span>/</span>
          <span>{{ currentSong.album.name || 'unknow' }}</span>
        </span>
        <span v-else>Kind words are the music of the world.</span>
      </h3>
      <p class="lrc">
        <span v-if="currentSongLrc.fetching">歌词加载中...</span>
        <span v-else>
          <span v-if="!currentSongLrcContent">暂无歌词</span>
          <span v-else>
            <span v-if="currentSongLrcContent.version < 3">非滚动歌词，所以我就不显示了</span>
            <span v-else>
              <transition name="module" mode="out-in">
                <span :key="currentSongRealTimeLrc" class="lrc-text" v-text="currentSongRealTimeLrc"/>
              </transition>
            </span>
          </span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import music from '~/expansions/music'
import { isBrowser } from '~/environment/esm'
export default {
  name: 'Music',
  head() {
    return {
      title: `${this.isEnLang ? '' : this.$i18n.nav.music + ' | '}Music`
    }
  },
  data() {
    return {
      height: 0
    }
  },
  computed: {
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    playerState() {
      return music.state
    },
    currentSong() {
      return music.currentSong
    },
    currentSongLrc() {
      return music.lrc
    },
    currentSongPicUrl() {
      return music.currentSongPicUrl
    },
    currentSongLrcContent() {
      return music.currentSongLrcContent
    },
    currentSongRealTimeLrc() {
      return music.currentSongRealTimeLrc
    },
    relativeStrokeWidth() {
      return (15 / 450 * 100).toFixed(1)
    },
    trackPath() {
      const radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
    },
    perimeter() {
      const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2
      const result = 2 * Math.PI * radius
      return result
    },
    circlePathStyle() {
      const perimeter = this.perimeter
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - (this.playerState.progress) / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  },
  created() {
    if (this.$store.state.global.isMobile) {
      this.$router.back()
    }
  },
  activated() {
    if (isBrowser) {
      this.updateScreenHeight()
      window.addEventListener('resize', this.updateScreenHeight)
      document.getElementsByTagName('body')[0].className = 'music'
    }
  },
  deactivated() {
    document.getElementsByTagName('body')[0].className = 'active'
    window.removeEventListener('resize', this.updateScreenHeight)
  },
  methods: {
    updateScreenHeight(event) {
      const screenHeight = window.innerHeight
      const minHeight = 14 * 53
      if (screenHeight - 14 * 4 > minHeight) {
        this.height = screenHeight - (14 * 12)
      } else {
        this.height = minHeight
      }
    },
    togglePlay() {
      music.humanizeOperation(music.player.togglePlay)
    },
    toggleMuted() {
      music.humanizeOperation(music.player.toggleMuted)
    },
    prevSong() {
      music.humanizeOperation(music.player.prevSong)
    },
    nextSong() {
      music.humanizeOperation(music.player.nextSong)
    }
  }
}
</script>

<style lang="scss">
.music{
  min-height: 100vh;
  position: relative;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABFBAMAAABZHs49AAAALVBMVEU5OTk4ODg5OTk7Ozs3Nzc4ODg+Pj48PDw2NjY2NjY3Nzc2NjY2NjY2NjY7Ozvs0BvUAAAAD3RSTlNQYFVFamU6QHp1cH+KhUprl3zAAAAMG0lEQVR4Xj2X629cRZrGn7fqtJ0b1lvnnE47Douqjt2EcImq+zg24aZuX+I4CHS6bUNuHxw6nGa0rNSmg5vd0UhxLhtfwspOHIiJGDmDYRMnrLhkRg5OVrA7M2R3zApm2JmEBCkEmN0v+z+sI2XmqVJdPjz16aeSfli6uvTVYM4/fez1L6719rdsn3rol5tGnaHDlyauvj3uXBs9ebxpqnemd8e26Unqnj70m5NrQR9m2lBXyT07M9331rr+4MjEte7x3Iaze451BDfeLMVtcVwerlXLleWtHA+XV66qHxoul8PyP7a9gCe3tjZuv+B+fXJ8pCmoPnpg3aHRVNjywXAlvvUUUPzeCS35JsqRqlsbl8NUe7e5R4YS8XJqw/FPKNwSEBdNwklODehIrt5wJu93qXNzU2eKTsFtMc5A5BopoKVwNWCSyYg3iz+Y1Yf+jbSPjYWkCkQDr97vdzmsWlRH0meRJGE6JgEXWoNBAMOQ0v4wuxpaA3nOF8AQG4eU8hWZvIqEUmqjr575FMpaDTC0AIFASPxzUbRKTenZonLcnAYbmzdC+aQUrfeThSRlnjkAZLVGyMxZELGGWV/X3QJmox3SBROw2XA4rdiFUqpFtPgdxgwkd30loIEAgkFw0MCS1rzRkQA0AQPFlgKx0jTYQXm6U0yoXGJatA6t/gAOAoYWzazhWK3xw2K3q1lpoFWD1Duuhqgoo6CQznWrLljPeXT1SFYHkdZuwCwglBakLh1JR0Y3S6FvIeoDQHX/oJRZdzDfxcm8ZsXd9yx9KWBt9ilUIIGKXQ7Cv2288M2FT3ZE8zevXF76YnHbxKfnxxYWPhmhB6OR59tTVsxMF3dPXFm8MnplaWJxoRdL18dPNc2P/eHlu+B82bO3s/17b3DLlErOFs72zs9PDWyfO7Vt/dgpTsi3L+uVX/ccfyxCfCdlrm+/C04crm5rr9aGytmp54bbN5TbyvF7EKIRWrYj++e4HLc9Xy7HELLgwgc+ugvOn179vFStZKq1feV4UHoZ2FfmtkfkHMknB2SDyqu++vo1L9SDCUJYEN8Fp1qLb2kjcKtzA0UBMej4pywpyAGMdLMG9EOvZQEBFzYQ6q/gVCw7zmYkLSQAdvF4hiFMQYDhOoIa8PB+MBgaLmA1mF2C5hezgaGECGRuE0c56usYbVCcE1oQNAkIuPcODgLNxCwgIEizBkx+n2ahBHS9RqpPK7g7ZiNgs2LJIGho2vOO9cDM0hMCAtCCkJzcm9NMQiBVAMCaot12E8LNLj/KcKApsHuesxJMniCdgCIirSBm9+nIa0mwiM5oDqCBczZiTXl2AcpoxswBL6MB15CFlizAloJ3J61X3+yQALRQWioYKCEBFRBwWwPAgTqbQtIfKXR19HfPzJwbaAzE1JtT/ieF/p390fX5k9Nn18/5R96e69kePTDSIXQwN6BMFKx86SHC5W/PTo91OclzM1Nzvdv8uXUju3Y8OD1/tHHUxeuN28fnDn/52K6F8dH3X3qdTzv1YblrdOzQQR//E3p2GbDScFxuq+2t1cql5WNcrtbi8h30XsjZwfz2mSN7147U1yrVbLWtJENMTqGwKmg6WteWshTkLNq9vHJ99Ku60hk/OTa17quuLTPqx/rB6S2HqmGWQigZhva5EPkAVP/HvSrflXxwbr67YIybRLf7s9q5TCnH8lkIKqTzCRXd//cQgHXhoaFuFnnyQf/dmk+6nFfLSQ/AF5H78OMtzdkRL/TYcUGZLSxjY0Fhs4K2IIWccqjvRkblllusTIfjFJymfnfNPiGbenKeyyGsAnm4t6VCsNBSM2tGN8j0jO13FXyfVNR9xi/khaCnHcXwZiW74AZwu5TD998SsFIzGOhEQfmMm61K+XeK3J/2Fau8OjbFHNZ3SmJWOuN11oNXWmmpIgDA08hD1fPVV4vLRVJu5C8nz9qu72GAp2SzJhdbROp7p7IVAKB0xNoAkSn0T1wfIuWyEorzRmlAHJ85tPE6gdycpwENPItLn9unJCxAABhuiLg02N2i1O7kybwqukGQa+XFE/uefq+iU/DCdtkOKa184veXT48tvD4x8/7CxPpz+HbxxsK1G6dmFk6Nf9yyeujTqB2ZLQfnVt44efH8qmO7Phz/3fOZg58f7Z26vrjigZ5DNx79KlVLvqSRmP/kyqVtxeMDBXXxbO/heefMjrHx3oWufHPP/eXhuFRpfzJvp1MbXvi1tDFQ5lpc0rscFPo7BtIXTycKA3lJAnX8EezKEmBtqAqFabc9fLCFm0vtMq4AtRDNbYMCW04gORBwGtBRAA22yd0pGiChjEnwVFrxyh2ju09UkfOTRWOgmDQjgzUlKBQAI2XEQsLa4PQJQY5WCkGhG0JFm7EikpRwFAtrNUsGoB9/A4UWkwHAzYCUgXrkP6qg70wxx0polW4wt+WjsxXT2c9V4RAD1oLFHgld8HMMAWaXgfCekXcMUVAoUORGRI6CfqBvCFt5q80lMlDoYDR7D7XBIRY6IKsBSNa7vi5BPN8SUH9S6IQrFME8+1J+4KuhpiwbrZOAlWJNFX6HzZFCxBJGkXrow5JKZg6aJsNa8ND27n69w6s8zaVQZhQDCUA5UAD5CsrcJwGjAzSsPliFSSjqM6HEhm4tWD/y86ir8jhT0iLHnpVQYsu3+CInSKW7G+fPvTW+uLS09MdKPrTY5AbJ6cbf/dIt6ldubn4/3/HRq9xjMy99zySakX2kE7L0xdLSjZaTHV3n3MXi/x7oaXz61OWxa7PPXL40P37y8vJL/76n6fL4/Fvv3zz39J4nlj5bvLjz7OQU4sHQVnWoDws3Vc2eCEkEyaaBQOc3BEu/XXVl+sCvdx5hFiFLGVobQDRN9qfXdMIUtUvNf+6Tkum4HLYyTFXmrw2M72i8+q8vf/rx5jOz48GFVOcjsi4ui85fOSs63m0Zu1RChwJDiEkqFPMBuSqtE74OHpjYeTlK6JXrjpZ3HJno26w+TgQDp6oq3o8fRW7TihcBFoDbsF11dxiXhAiMkzYqEZz/QLOG+8TSqYM/9bwfvSwFfc3lvY9llUt64z6kC3k3qcR7Fx2lWKVBwiSFK5ouv+qKgAwSuDNnQyXwjswkVrmOSjR35pHL97Nhcf54REV1HIYVkYZYsVihwIUvACU0wjt4TfZkTaLYoRMiCGC4YFy/2JXGJgjWZJQRGrT6t3uNCyMAIENYIzGEjqM6+Z0mIhsZwGoRuDiwMR+w1iQCkVhegtXtQwIgshC47aCZ660+mRpKCLQIDQYiaajA2JUXgVIFiDyEEHrVzJuvBJBgAJKqwP79JH/xRo4YHYYLGkCYHh07d/hEkBZIJCNRjBLQXuKJ4bBBylyWoW01rrWThT74ZtEqigA0WPjH/vPDM3M9eN25MDp7pnfx+vp7Do5OnB557fyxG6ePrzv67dvDn5WqlXIl/KAzvHJp4uZvlpbzX/B3bntiZ2EQ6z1vb6b/9OSfxjf7b0WHeXj2bGqt+1G1d+3fDe+7lNtP3zVI0nvPv5Fd+qafEpicraXi4Wrba6VYW7+xVh//36/i6vC+cC3Wldt2x1vjtrXVhpU/qYesrvju2ukXt64Vw601xHE1U91f5C9Da8O2Unx/7zvxcFwNK0++F8fx8GCtVDp07uK7zt/0+zs3tNVq1bit7uU4BgVstYA1AQS76t7Oyv0lSiRs3F6rwXiAe/j3dCuRyLFowKqfu+CGR37amgNAWggQwJCKdGetJCwJDAQ5SEFUvJ1xGdnbriFoBUDoNVssAPKkAAgCgRGgvqEEWja33hKAhCQp5b3MnkuBmwXcWwEJ+/DeCgDIQEBmiKRmwI32CSZKgGSkIWTivuJcswtkCgz8VTagwVoAQsMADIKaGmJXiKzQKWjtMYfuebeP8YNiqfmubLxpPQA5YSAQZITQQqR/8QLnPDIC3iwEaUl6d1ZAmgKvdP8iGz1CwgtEWggKDMHYjHT/Zb+X4kRGZIRB4OoCGnLg+0BFAv4iG4dekYCWUjbfqgcsMhDJSb18zVqdKrAuGkdS0w/52/AsPMgNd2Wj5H+PhcUbi9cmbl5dXDz81lnVf7gnOvbt9asL21Z9dv3SyMXR627qxhXvn3Ytf61fPHbhrmx809r6/9IOPmicRBcOAAAAAElFTkSuQmCC);
  background-color: rgb(209, 217, 224);
  background-repeat: repeat;
}
</style>
<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  > .player {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2em;
    width: 100%;

    > .prev-song,
    > .next-song {
      width: 3rem;

      &:hover {
        > .iconfont {
          color: $text;
        }
      }

      > .iconfont {
        font-size: 3em;
        color: $dividers;
      }
    }

    > .album-box {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38rem;
      height: 38rem;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }

      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      > .song-bg-box {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 1rem;
        overflow: hidden;
        border-radius: 100%;
        animation: rotation 26s linear infinite;
        animation-play-state: paused;

        &.playing {
          animation-play-state: running;
        }

        > img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background-color: darkgray;
          background-image: url('/images/music-bg.jpg');
          background-size: cover;
        }
      }

      > .toggle-box {
        z-index: 9;

        > .toggle-btn {
          width: 6rem;
          height: 6rem;
          line-height: 6rem;
          text-align: center;
          background-color: $module-bg;
          border-radius: 100%;
          opacity: 0.5;

          &:hover {
            opacity: 0.8;
            transform: scale(1.2);
          }

          > .iconfont {
            color: $text-reversal;
            font-size: 3em;
          }
        }
      }

      > .toggle-muted {
        position: absolute;
        bottom: 15%;

        > .muted-btn {
          > .iconfont {
            font-size: 2em;
            color: $module-hover-bg;
          }

          &:hover {
            > .iconfont {
              color: $module-bg;
            }
          }
        }
      }

      > .circle-progress {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
      }
    }
  }

  > .song-info {
    text-align: center;

    > .name {
      margin-bottom: 1em;
    }

    > .lrc {
      @keyframes lrc-text {
        0% {
          color: $primary;
        }
        33% {
          color: $red;
        }
        66% {
          color: $accent;
        }
      }

      .lrc-text {
        color: $primary;
        // animation: lrc-text 5s linear infinite;
      }
    }
  }
}
</style>
