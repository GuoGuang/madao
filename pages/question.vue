<template>
  <!-- 问答 -->
    <el-row >
      <el-col :span="4">
        <div c>
            66
        </div>
      </el-col>
      <el-col :span="14" >
        <div class="" style="color:blue" :key="index" v-for="(question, index) in question">
           Read and Write from serial port gives “OUTPUT_BUFFER_EMPTY” (maybe crc calc is not correct)
        </div>
      </el-col>


      <el-col :span="6">
          <div >
            <aside-view key="aside"/>
          </div>
    </el-col>
    </el-row>


</template>

<script>
  import AsideView from '~/components/layout/pc/aside/main'
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
    components: {
        AsideView
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