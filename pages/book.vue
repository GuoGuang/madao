<template>
  <!-- 书栈 -->
    <el-row class="book" style="height:400px;position:relative;">

      <el-col :span="20" style="    position: absolute;
                                      top: 50%;
                                      left: 50%;
                                      margin: -50px 0 0 -50px;
                                      width: 100px;
                                      height: 100px;
                                      font-weight: bold;
                                      font-size: 18px;">
       
      
        开发中...
         
      </el-col>

      <el-col :span="4" class="right-sidebar">
       
         
      </el-col>
    </el-row>


</template>

<script>
  import AsideView from '~/components/layout/pc/aside/main'
  export default {
    name: 'book',
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
