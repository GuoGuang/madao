<template>
  <!-- 问答 -->
  <div>
    <el-row :key="index" v-for="(question, index) in question">
      <el-col :span="3">
        <div class="" style="color:red">
          votes
          answers
          13 views
        </div>
      </el-col>
      <el-col :span="21" >
        <div class="" style="color:blue">
            How can i search variable value in View page source using selenium
        </div>
      </el-col>
    </el-row>
</div>


</template>

<script>
  export default {
    name: 'question',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.question + ' | '}event`
      }
    },
    fetch({ store }) {
      return store.dispatch('events/fetchEvents')
    },
    computed: {
      question() {
        return this.$store.state.events.events.data
      },
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
  
</style>