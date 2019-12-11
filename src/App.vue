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
  @userModule.Mutation('changeMobile') public changeMobile!: Function
  @userModule.Getter('fullName') public fullName!: string
  @userModule.State('firstName') public firstName!: string
  @userModule.State('mobile') public mobile!: string
  public mounted() {
    util.setFontSize()
    sessionStorage.setItem('token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzY4MjM5MjcsInVzZXJfbmFtZSI6IjE1NTU4MDUwNjc1IiwianRpIjoiZDVmYjE2ZmItODA4Mi00YzEzLTkwOTgtMzMyZjUwYjFkOTIyIiwiY2xpZW50X2lkIjoidXNlci1zZXJ2aWNlIiwic2NvcGUiOlsic2VydmljZSJdfQ.XLs_9JqIL9v9WgzwZUMjwL61fllC6ohqwhtbUZ2oxdn2jcP45o0Rkhx8bmagAdJ_GeXJq0n9aROkuAWBKw2uKzIf1Z5hnk-B4L97WJSNT_euqbpJOIMD7lMy-QOyGJgV0x5DHsdrabnlhWB-uJ0uZ4iX5DIr4WS9a7ZSnWH57lU4YTf13FJRgtVwhCaL5q_nAtzg4p9dnBo-msQWDXZjDj7-MMlQDWFprpMEH9GOu0gnkIaVWsbKgAQvNEBZJ45GidOHa4Td9QGWa3TOWIUgHmItXHPil-pLuiicXQwXkq0YA4V1GHA9AggRQaEfkxnyrafaR5VQBlrHQDW03KXeoQ')
    sessionStorage.setItem('phone', '15617907340')
    sessionStorage.setItem('deviceId', '1124234')
    const result = {
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzY4MjM5MjcsInVzZXJfbmFtZSI6IjE1NTU4MDUwNjc1IiwianRpIjoiZDVmYjE2ZmItODA4Mi00YzEzLTkwOTgtMzMyZjUwYjFkOTIyIiwiY2xpZW50X2lkIjoidXNlci1zZXJ2aWNlIiwic2NvcGUiOlsic2VydmljZSJdfQ.XLs_9JqIL9v9WgzwZUMjwL61fllC6ohqwhtbUZ2oxdn2jcP45o0Rkhx8bmagAdJ_GeXJq0n9aROkuAWBKw2uKzIf1Z5hnk-B4L97WJSNT_euqbpJOIMD7lMy-QOyGJgV0x5DHsdrabnlhWB-uJ0uZ4iX5DIr4WS9a7ZSnWH57lU4YTf13FJRgtVwhCaL5q_nAtzg4p9dnBo-msQWDXZjDj7-MMlQDWFprpMEH9GOu0gnkIaVWsbKgAQvNEBZJ45GidOHa4Td9QGWa3TOWIUgHmItXHPil-pLuiicXQwXkq0YA4V1GHA9AggRQaEfkxnyrafaR5VQBlrHQDW03KXeoQ',
      phone: '15617907340',
      deviceId: '1124234'
    }
    this.fetchNewdata(result)
  }
}
</script>
