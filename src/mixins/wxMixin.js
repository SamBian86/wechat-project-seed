import { getWxShareInfo, getWxSign } from '@/api/wxAuth'
// import { recordShare } from '@/api/behavior'
import { Toast } from 'vant'
import Vue from 'vue'
Vue.use(Toast)
const wx = require('weixin-js-sdk')

export default {
  data() {
    return {
      shareInfo: {
        title: '',
        subTitle: '',
        photoUrl: ''
      },
      params: ''
    }
  },
  created() {},
  methods: {
    wxConfig(config) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'closeWindow',
          'scanQRCode',
          'chooseImage',
          'uploadImage',
          'getLocalImgData'
        ] // 必填，需要使用的JS接口列表
      })
      wx.ready(() => {
        this.handleWxShare()
      })
    },
    getWxShareInfo(name) {
      getWxShareInfo(name).then(response => {
        if (response.data !== null) {
          this.shareInfo = response.data
        }
        this.getWxConfig()
        this.showBackTip()
      })
    },
    setWxShareInfo(shareInfo) {
      this.shareInfo = shareInfo
      this.getWxConfig()
      this.showBackTip()
    },
    showBackTip() {
      const backType = this.$route.query.backType
      if (backType) {
        this.showBackTip = true
      } else {
        this.showBackTip = false
      }
    },
    handleGoBack() {
      const backType = this.$route.query.backType
      const backObj = {
        home: '/report'
      }
      this.$router.push({
        path: backType ? backObj[backType] : backObj['home']
      })
    },
    getWxConfig() {
      const url = location.href.split('#')[0]
      getWxSign({ url: url }).then(response => {
        const config = response.results
        this.wxConfig(config)
      })
    },
    handleWxShare() {
      const url = process.env.VUE_APP_REDIRECT_URL + this.params
      //需在用户可能点击分享按钮前就先调用
      wx.updateAppMessageShareData({
        title: this.shareInfo.title, // 分享标题
        desc: this.shareInfo.subTitle, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.shareInfo.photoUrl, // 分享图标
        success: function() {
          // 设置成功
        }
      })
      wx.updateTimelineShareData({
        title: this.shareInfo.title, // 分享标题
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.shareInfo.photoUrl, // 分享图标
        success: function() {
          // 设置成功
        }
      })
      wx.onMenuShareTimeline({
        title: this.shareInfo.title, // 分享标题
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.shareInfo.photoUrl, // 分享图标
        success: function() {
          // 用户点击了分享后执行的回调函数
          // Toast('onMenuShareTimeline')
        }
      })
      wx.onMenuShareAppMessage({
        title: this.shareInfo.title, // 分享标题
        desc: this.shareInfo.subTitle, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.shareInfo.photoUrl, // 分享图标
        success: function() {
          // 用户点击了分享后执行的回调函数
          // Toast('onMenuShareAppMessage')
        }
      })
      wx.onMenuShareQQ({
        title: this.shareInfo.title, // 分享标题
        desc: this.shareInfo.subTitle, // 分享描述
        link: url, // 分享链接
        imgUrl: this.shareInfo.photoUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          // Toast('onMenuShareQQ')
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareWeibo({
        title: this.shareInfo.title, // 分享标题
        desc: this.shareInfo.subTitle, // 分享描述
        link: url, // 分享链接
        imgUrl: this.shareInfo.photoUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          // Toast('onMenuShareWeibo')
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareQZone({
        title: this.shareInfo.title, // 分享标题
        desc: this.shareInfo.subTitle, // 分享描述
        link: url, // 分享链接
        imgUrl: this.shareInfo.photoUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          // Toast('onMenuShareQZone')
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
    },
    handleScanQrcode() {
      return new Promise((reslove, reject) => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            reslove(result)
          },
          fail: function(err) {
            reject(err)
          }
        })
      })
    },
    handleCloseWindow() {
      wx.closeWindow()
    },
    handleGetCode(path) {
      const appId = process.env.VUE_APP_APP_ID
      const baseUrl = window.location.origin
      const redirectUri = encodeURIComponent(`${baseUrl}${path}`)
      const state = Math.round(Math.random() * 100)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    }
  }
}
