<template>
  <div class="calendar-box">
    <!-- 年份 月份 -->
    <div class="months">
      <ul class="month-list">
        <li class="arrow prev" @click="pickPre(currentYear, currentMonth)">❮</li>
        <li class="year-month">
          <span class="choose-year">
            <span>{{ currentYear }}</span>
            <span>{{ isEnLang ? 'Y' : '年' }}&nbsp;</span>
            <span>{{ currentMonth }}</span>
            <span>{{ isEnLang ? 'M' : '月' }}&nbsp;</span>
            <span>{{ currentDay }}</span>
            <span>{{ isEnLang ? 'D' : '日' }}</span>
          </span>
        </li>
        <li class="arrow next" @click="pickNext(currentYear, currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul v-if="isEnLang" class="weekdays">
      <li v-for="(day, index) in weeksEn" :key="index">{{ day }}</li>
    </ul>
    <ul v-else class="weekdays">
      <li v-for="(day, index) in weeksZh" :key="index">{{ day }}</li>
    </ul>
    <!-- 日期 -->
    <div v-if="!days.length" class="days-loading">
      <loading-box class="loading" />
    </div>
    <ul v-else class="days">
      <li v-for="(day, index) in days" :key="index">
        <!--本月-->
        <span v-if="day.getMonth() + 1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span
          v-else
          :class="{
            'active':
              day.getFullYear() == new Date().getFullYear() &&
              day.getMonth() == new Date().getMonth() &&
              day.getDate() == new Date().getDate()
          }"
          class="item"
        >
          <!--today-->
          <nuxt-link :to="`/date/${ formatDate(day.getFullYear(), day.getMonth() + 1, day.getDate())}`">{{ day.getDate() }}</nuxt-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AsideCalendar',
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      weeksZh: ['一', '二', '三', '四', '五', '六', '七'],
      weeksEn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  },
  computed: {
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    }
  },
  mounted() {
    this.initData(null)
  },
  methods: {
    initData(cur) {
      const date = cur ? new Date(cur) : new Date()
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentWeek = date.getDay()
      if (this.currentWeek === 0) this.currentWeek = 7
      const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      // console.log("today:" + str + "," + this.currentWeek)
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        const d = new Date(str)
        d.setDate(d.getDate() - i)
        // console.log("y:" + d.getDate())
        this.days.push(d)
      }
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        const d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    },
    pick(date) {
      alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    },
    pickPre(year, month) {
      //  setDate(0); 上月最后一天
      //  setDate(-1); 上月倒数第二天
      //  setDate(dx) 参数dx为 上月最后一天的前后dx天
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear(year, month) {
      alert(year + ',' + month)
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate(year, month, day) {
      const y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style lang="scss" scoped>
  .calendar-box {
    min-height: 17em;

    > .months {
      margin-bottom: .5em;

      > .month-list {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;

        > li {
          float: left;
          height: 2em;
          line-height: 2em;
          text-align: center;

          &.year-month {
            width: 11.4em;
          }

          &.arrow {
            width: 2em;
            background-color: $module-hover-bg;
            cursor: pointer;

            &:hover {
              background-color: $module-hover-bg-darken-10;
            }

            &.prev {
              margin-right: 1em;
            }

            &.next {
              margin-left: 1em;
            }
          }
        }
      }
    }

    > .days,
    > .weekdays {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      margin-bottom: .5em;

      > li {
        display: block;
        float: left;
        width: calc(100% / 7);
        text-align: center;
      }
    }

    > .weekdays {
      height: 2em;
      line-height: 2em;
    }

    > .days-loading {
      width: 100%;
      height: 14rem;
    }

    > .days {
      min-height: 10em;
      margin-bottom: 0;
      position: relative;

      > li {
        line-height: 2.5em;

        > .other-month {
          opacity: .3;
          cursor: initial;
        }

        > .item {
          display: block;
          border-radius: 100%;

          > a {
            display: block;
            // cursor: pointer;
          }

          &:hover {
            background-color: $module-hover-bg-opacity-3;
          }

          &.active {
            background-color: $module-hover-bg;
          }
        }
      }
    }
  }
</style>
