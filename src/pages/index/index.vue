<template>
   <div class="container">
        <div class="header">
          <div class="nav">
            <p v-for="(item, index) in navList" :class="currentIndex === index ? 'activeNav': null" :key="index"
                @click="check(index)">{{item.name}}</p>
          </div>
          <p class="info">仅展示一级邀请的被邀请人信息</p>
        </div>
        <div class="list">
          <div class="list-title">
            <p>邀请时间</p>
            <p>被邀请人号码</p>
            <p v-show="currentIndex === 0">状态</p>
          </div>
          <div ref="listWrapper" class="listWrapper">
            <div class="list-container">
              <div class="list-item" v-for="(item, index) in list" :key="index">
                  <p>{{util.formatDateTime(item.InvitationTime, true)}}</p>
                  <p>{{item.phone}}</p>
                  <p v-show="currentIndex === 0">{{util.status(item.identity)}}</p>
            </div>
              <p class="loading" v-show="hasMore">正在加载中...</p>
            </div>
            <div class="noData" v-show="!list.length && !hasMore">
              <div><img src='../../common/image/norecord@2x.png' alt="" /></div>
            </div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import BScroll from 'better-scroll'
import http from '../../assets/js/http'
import util from '../../assets/js/util'
const userModule = namespace('user')

@Component
export default class Index extends Vue {
    currentIndex:number = 0
    navList:Array<any> = [{name: '邀请记录'}, {name: '未登录'}, {name: '已实名'}, {name: '登录未实名'}]
    list:Array<any> = []
    searchForm:any = {
        page: 0,
        phone: sessionStorage.getItem('phone')
    }
    hasMore:boolean = true // 是否加载更多
    scroll:object = null
    pageTotal:number = 0
    @userModule.Getter('userData') public userData!: any;
    public mounted() {
        this.loadMore()
        this.initScroll()
    }
    public initScroll() {
        let scroll: any
        if (!scroll) {
          scroll = new BScroll('.listWrapper', {
            click: true,
            scrollY: true
          })
          scroll.on('scrollEnd', () => {
            // 到底部时候,给父组件通知消息
            // y是scroll 纵轴坐标,maxScrollY 最大纵向滚动位置,scroll 纵向滚动的位置区间是 0 - maxScrollY，并且y,maxScrollY都是负值。
            if (scroll.y === 0) {
              return
            }
            if (scroll.y <= (scroll.maxScrollY + 100)) {
              this.loadMore()
              scroll.refresh() // 加载更多数据后，重新计算高度
            }
          })
        } else {
            scroll.refresh()
        }
    }
    public loadMore () {
        if (!this.hasMore) {
          return
        }
        this.searchForm.page++ // 当前页数+1
        this.getList()
    }
    public getList() {
        http.post('user-service/user/getbeinvitations', this.searchForm).then(res => {
          if (res.code === 200) {
            const oldList = this.list
            this.list = res.data.list.concat(oldList)
            this.pageTotal = res.data.pages
            this._checkMore(res.data.list) // 检查是否滑倒底部
          }
        })
    }
    public _checkMore (data: any) {
        if (!data.length || this.searchForm.page >= this.pageTotal) {
          this.hasMore = false
        }
    }
    public check(index: number) {
        if (index === 0) {
        } else if(index === 1) {
            this.searchForm.hasLogin = false
        } else if(index === 2){
          this.searchForm.identity = 1
        } else if(index === 3) {
            this.searchForm.identity = 2
            this.searchForm.hasLogin = true
            console.log('ttt', this.searchForm.hasLogin)
        }
        this.currentIndex = index
        this.hasMore = true
        this.list = []
        this.searchForm.page = 0
        this.searchForm.phone = this.userData.phone
        this.loadMore()
        this.initScroll()
    }
}
</script>
<style scoped lang="scss">
@import 'index.scss'
</style>