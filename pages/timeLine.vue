<template>
  <div style="justify-content: center;display: flex;margin-top: 20px;">
    <el-collapse-transition>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp">
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-collapse-transition>
  </div>

</template>

<script>
export default {
  name: 'TimeLine',
  data() {
    return {
      activities: [
        {
          content: '开发IDEA插件 Generate Crud ',
          timestamp: '2019-10-01',
          color: '#0bbd87'
        },
        {
          content: '基于Crud插件开发的博客系统上线',
          timestamp: '2019-11-30 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '新增"开源"板块',
          timestamp: '2019-12-03',
          color: '#0bbd87'
        }, {
          content: '新增"音乐"子板块',
          timestamp: '2020-01-30',
          color: '#0bbd87'
        }, {
          content: '新增"福利"板块',
          timestamp: '2020-03-24',
          color: '#0bbd87'
        }, {
          content: '新增"服务"板块',
          timestamp: '2020-06-13',
          color: '#0bbd87'
        }, {
          content: '部署"乌云搜"系统',
          timestamp: '2021-10-15',
          color: '#0bbd87'
        }, {
          content: 'Generate Crud插件下载量达到2K+',
          timestamp: '2021-12-11',
          color: '#0bbd87'
        }]
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>
