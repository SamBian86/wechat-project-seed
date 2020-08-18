<template>
  <div class="container">
    <div class="container_area">
      <div class="user_info_container">
        <div class="user_avatar">
          <van-image
            class="user_avatar_style"
            fit="contain"
            :src="wechatInfo && wechatInfo.headimgurl"
          />
        </div>
        <div class="user_info">
          <div class="user_name">{{ pageInfo && pageInfo.name }}</div>
          <div class="user_age"
            >{{ pageInfo && pageInfo.sexName }}
            {{ pageInfo && pageInfo.age }}岁</div
          >
        </div>
      </div>
      <div
        v-if="pageInfo && pageInfo.reportList.length !== 0"
        class="report_list"
      >
        <div
          class="report_item"
          :key="index"
          v-for="(item, index) in pageInfo.reportList"
          @click="goToDetail(item.id)"
        >
          <div class="report_title">{{ item.reportName }}</div>
          <div class="report_time">{{ item.reportTime }}</div>
        </div>
      </div>
    </div>
    <!-- <div v-if="showBackTip === true" class="back_tip" @click.stop="handleGoBack">返回首页</div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Image } from 'vant'
import 'vant/lib/image/style'
Vue.use(Image)

import pageMixin from '@/mixins/pageMixin'
import wxMixin from '@/mixins/wxMixin'
import { getWechatInfoByOpenid, getReportIndex } from '@/api/report'
export default {
  mixins: [wxMixin, pageMixin],
  data() {
    return {
      wechatInfo: null,
      pageInfo: null
    }
  },
  computed: {
    ...mapGetters(['app_openid'])
  },
  watch: {},
  created() {
    this.getWechatInfoByOpenid()
  },
  methods: {
    setParams() {
      const { wechatInfo } = this
      this.params = `/share?path=/report&backType=home`
      this.setWxShareInfo({
        title: '测试分享',
        subTitle: '测试分享子标题',
        photoUrl: wechatInfo.headimgurl
      })
    },
    getWechatInfoByOpenid() {
      getWechatInfoByOpenid({
        openid: this.app_openid
      }).then(response => {
        this.wechatInfo = response.data
        this.getReportIndex()
      })
    },
    getReportIndex() {
      getReportIndex().then(response => {
        this.pageInfo = response.data
        // this.setParams()
      })
    },
    goToDetail(id) {
      this.$router.push({
        path: `/report/${id}`
      })
    }
  }
}
</script>

<style lang="scss">
.container_area {
  padding: 1.3333vw;
}

.user_info_container {
  height: 32vw;
  color: #333;
  border-radius: 2.6667vw;
  border: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  background: #fff;
}

.user_avatar_style {
  width: 21.3333vw;
  height: 21.3333vw;
  border-radius: 10.6667vw;
  overflow: hidden;
  margin-left: 6.6667vw;
}

.user_info {
  padding-left: 8vw;
}

.user_name {
  font-size: 4.2667vw;
  font-weight: bold;
  color: #333;
  padding-bottom: 1.3333vw;
}

.user_age {
  font-size: 3.7333vw;
  color: #333;
}

.report_list {
  margin-top: 1.3333vw;
  background: #fff;
}

.report_item {
  border-radius: 2.6667vw;
  border: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  padding: 3.4vw 5.0667vw;
  color: #333;
}

.report_title {
  font-weight: bold;
  padding-bottom: 1.3333vw;
}
</style>
