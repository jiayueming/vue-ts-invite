<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import util from './assets/js/util'
const userModule = namespace('user')

@Component
export default class App extends Vue {
  @userModule.Action('fetchNewdata') public fetchNewdata!: Function
  public mounted() {
    util.setFontSize()
    sessionStorage.setItem('token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzkxNDI0OTUsInVzZXJfbmFtZSI6IjE1OTM2OTk5ODk3IiwianRpIjoiYjdhNTRkMmItMjEyMC00ZWEyLTk1NjQtMjJkNzBmMDU4NzVjIiwiY2xpZW50X2lkIjoidXNlci1zZXJ2aWNlIiwic2NvcGUiOlsic2VydmljZSJdfQ.aG7Zf3OMJxjDcT6qlLxiqY2i1nlipP05qinCWrYDcxYo3zN_hwfrF2A_1txd78GsX3kf22JNqSBHd_yIa4OBTLBmowEbyvYyjyAVOrJUG1cyTMqKxnG0tf4bQLi7FOhgpIug8SX-ZnJmOAS9xW3mc6C9x3EF2-GV5eK916EbIQ17or-YLL2QZG9sJbEKJX9whWBcBTYDJo3fWdxoxSBQyz1zJdc_unXrX0g58SZAUnQhcqqF4JLAzc43VgQKdtpyjAaJMVslQoecIWmbvMhFr_my4bVix1z3btvw_kSqA2ZM9FgERRDlzqgyH6CY00DwCQjg2y2Jo9xv-GpxJ265cg')
    sessionStorage.setItem('phone', '15617907340')
    sessionStorage.setItem('deviceId', '1124234')
    const result = {
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzkxNDI0OTUsInVzZXJfbmFtZSI6IjE1OTM2OTk5ODk3IiwianRpIjoiYjdhNTRkMmItMjEyMC00ZWEyLTk1NjQtMjJkNzBmMDU4NzVjIiwiY2xpZW50X2lkIjoidXNlci1zZXJ2aWNlIiwic2NvcGUiOlsic2VydmljZSJdfQ.aG7Zf3OMJxjDcT6qlLxiqY2i1nlipP05qinCWrYDcxYo3zN_hwfrF2A_1txd78GsX3kf22JNqSBHd_yIa4OBTLBmowEbyvYyjyAVOrJUG1cyTMqKxnG0tf4bQLi7FOhgpIug8SX-ZnJmOAS9xW3mc6C9x3EF2-GV5eK916EbIQ17or-YLL2QZG9sJbEKJX9whWBcBTYDJo3fWdxoxSBQyz1zJdc_unXrX0g58SZAUnQhcqqF4JLAzc43VgQKdtpyjAaJMVslQoecIWmbvMhFr_my4bVix1z3btvw_kSqA2ZM9FgERRDlzqgyH6CY00DwCQjg2y2Jo9xv-GpxJ265cg',
      phone: '15617907340',
      deviceId: '1124234'
    }
    this.fetchNewdata(result)
  }
}
</script>
