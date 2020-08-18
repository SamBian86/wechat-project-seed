<template>
  <div class="container">
    <div class="content_area">
      <div class="content_title">报告内容</div>
      <div class="content_detail" v-html="detail && detail.reportContent"></div>
    </div>
    <div class="content_area">
      <div class="content_title">健康建议</div>
      <div class="content_detail" v-html="detail && detail.reportAdvise"></div>
    </div>
  </div>
</template>

<script>
import { getReportById } from '@/api/report'
import pageMixin from '@/mixins/pageMixin'
import wxMixin from '@/mixins/wxMixin'
export default {
  mixins: [wxMixin, pageMixin],
  created() {
    this.getReportById()
    // this.setParams()
  },
  data() {
    return {
      detail: null
    }
  },
  watch: {},
  methods: {
    setParams() {
      // const { detail } = this
      // this.params = ``
      // this.setWxShareInfo({
      //   title: detail.curriculumInfo.curriculumName,
      //   subTitle: detail.curriculumInfo.curriculumDetail,
      //   photoUrl: detail.sharePhoto
      // })
    },
    getReportById() {
      const { id } = this.$route.params
      getReportById({ id }).then(response => {
        this.detail = response.data
      })
    }
  }
}
</script>

<style lang="scss">
.content_area {
  padding: 1.3333vw;
  border-bottom: 1px solid #e8e8e8;
  &:last-child {
    border: none;
  }

  .content_title {
    padding: 3vw 0;
    color: #333;
    font-weight: bold;
  }

  .content_detail {
    font-size: 4vw;
    padding-bottom: 5.3333vw;
  }
}
</style>
