<template>
    <div class="inviteData-container">
        <div class="bg">
            <div class="title">
                <img src='../../common/image/wemzi@2x.png' alt="" />
            </div>
            <p class="rule" @click="show"></p>
            <div class="btn" @click="goInvite">
                <p>TOOL</p>
                <p>查看</p>
            </div>
        </div>
        <div class="btn-box" @click="processAsync">
            <img src='../../common/image/anniu@2x.png' alt="" />
        </div>
        <div class="content">
            <div class="inviteDetail">
                <div class="left">
                    <p>{{inviteDetail.inviteAmount || '0'}}</p>
                    <p class="gray-font">我已邀请</p>
                </div>
                <div class="right">
                    <p>￥{{inviteDetail.rewardCny || '0'}}</p>
                    <p class="gray-font">我的收益</p>
                </div>
            </div>
            <div class="list">
                <div class="title">    
                    <p v-for="(item, index) in navList" :class="currentIndex === index ? 'active': null"
                    :key="index" @clik="check(index)">{{item.name}}</p>   
                </div>
                <div class="inner-list" v-show="currentIndex === 0">
                    <div class="subTitle inviteTitle">
                        <p>邀请时间</p>
                        <p>昵称</p>
                        <p>状态</p>
                    </div>
                    <div v-for="(item, index) in list2" class="item padding0" :key="index">
                        <p>{{item.InvitationTime}}</p>
                        <p class="ml55">{{item.phone}}</p>
                        <p>{{item.identity}}</p>
                    </div>
                    <p @click="loadMore(list2)" v-show="hasMore && list2.length" class="load">点击更多</p>
                </div>
                <div class="inner-list" v-show="currentIndex === 1">
                    <div class="rankTitle subTitle padding56">
                        <p>名次</p>
                        <p>昵称</p>
                        <p>邀请人数</p>
                    </div>
                    <div v-for="(item, index) in list" :key="index" class="item">
                        <p v-show="item.rank <= 3">
                            <img v-show="item.rank === 1" src='../../common/image/first@2x.png' alt="" />
                            <img v-show="item.rank === 2" src='../../common/image/second@2x.png' alt="" />
                            <img v-show="item.rank === 3" src='../../common/image/third@2x.png' alt="" />
                        </p>
                        <p v-show="item.rank > 3" class="ml3">{{item.rank || '--'}}</p>
                        <p>{{item.mobile}}</p>
                        <p>{{item.inviteAmount || '--'}}</p>
                    </div>
                </div>     
                <div class="inner-list" v-show="currentIndex === 2">
                    <div class="subTitle rankTitle">
                        <p>日期</p>
                        <p>奖励</p>
                    </div>
                        <div class="item padding30" v-for="(item, index) in list3" :key="index">
                        <p>{{item.createDate}}</p>
                        <p class="activeColor">{{item.rewardBtc}}BTC</p>
                    </div>
                </div>
                <div class="noData" v-show="noData">
                    <img src='../../common/image/kongshuju@2x.png' alt="" />
                    <p>快去邀请好友吧~</p>
                </div>
            </div>
        </div>
        <div class="footer" v-show="userDetail.partySeniority && currentIndex === 1">
            <p class="footer-title">我的排名:</p>
            <div class="userRank">
                <p>{{userDetail.rank || '--'}}</p>
                <p class="ml30">{{userDetail.title || '--'}}</p>
                <p>{{userDetail.inviteAmount || '--'}}</p>
            </div>
        </div>
        <div class="footer" v-show="userDetail.partySeniority">
            <p class="warn">初级实名并邀请好友登录后即可参与活动</p>
        </div>
        <div class="popup-rule-box" v-show="showRule">
            <div class="popup-content">
                <p class="rule-title">活动规则</p>
                <p class="rule-text">1. 只有通过实名认证的用户才可参与瓜分1BTC的活动</p>
                <p class="rule-text">2. 被邀请者需要注册并登录APP才算有效用户。一定要登录哦！登录后才能瓜分BTC。</p>
                <p class="rule-text">3. 每日凌晨0点进行统计，截止时间为24小时。以登录时间为准。24小时之后的新用户登录将记录到新的一天中。</p>
                <p class="rule-text">4. 收益将在次日12点之前进行发放。并以BTC的形式发放至用户钱包。</p>
                <p class="rule-text">5. 关于提币，快比特小黑将在社群提前告知提币规则与时间。</p>
                <div class="close" @click="hide">
                    <img src="https://html.51nbapi.com/html/IntegralMall/images/public_icon_close@2x.png" alt="" />
                </div>
            </div>
        </div>
        <!--<div class="popup-rule-box" onTouchMove={this.touchmove.bind(this)}
        style={{display : this.props.state.isShare ? 'block': 'none'}}>
            <div class="imgbox">
                <img src={this.props.state.shareImg} alt="" />
            </div>
        </div>
        <canvas id="canvas" class="canvas" width="400" height="700">
            Your browser does not support the HTML5 canvas tag.
        </canvas>-->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import util from '../../assets/js/util'
import http from '../../assets/js/http'
const userModule = namespace('user')

@Component
export default class inviteData extends Vue {
    currentIndex: number = 0
    navList: object[] = [{name: '我的邀请'}, {name: '昨日排名'}, {name: '每日收益'}]
    inviteDetail: any = {}
    list: any[] = []
    list2: any[] = []
    list3: any[] = []
    hasMore: boolean = true
    page: any = 1
    showRule: boolean = false
    shareImg: string = ''
    codeUrl: string = ''
    noData: boolean = false
    userDetail: any = {}
    codeDetail: any = {}
    userInfo: object = {}
    pageTotal: number = 0
    personInfo: object = {}
    @userModule.Getter('userData') public userData!: any;
    public created() {
        this.getPersonInvite()
        this.getInviteList()
        this.getCode()
        this.getUserDetail()
    }
    //获取邀请数好收益
    getPersonInvite() {
        http.post('user-service/partybtc/getinviteAmount').then(res => {
            if (res.code === 200) {
                this.inviteDetail = res.data
            }
        })
    }
    //获取排名榜单信息
    getRank() {
        http.post('user-service/partybtc/getpartyrank').then(res => {
            if (res.code === 200) {
                if (res.data.length) {
                    this.list = res.data
                } else {
                    this.noData = true
                }
            }
        })
    }
    //获取收益列表
    getIncome() {
        http.post('user-service/partybtc/getrewardlist').then(res => {
            if (res.code === 200) {
                res.data.map((item, index) => {
                    item.createDate = util.formatDateTime(item.createDate)
                    return item
                })
                if (res.data.length){
                    this.list3 = res.data
                } else {
                    this.noData = true
                }
            }
        })
    }
    //获取邀请好友列表
    getInviteList() {
        http.post('user-service/user/getbeinvitations', {
            page: this.page,
            pageSize: 20,
            party: 'partyBtc'
        }).then(res => {
            if (res.code === 200) {
                res.data.list.map((item, index) => {
                    item.InvitationTime = util.formatDateTime(item.InvitationTime, true)
                    item.identity = util.status(item.identity)
                    return item
                })
                let oldList = this.list2
                if (res.data.list.length) {
                    this.list2 = res.data.list.concat(oldList)
                    this.pageTotal = res.data.pages
                } else {
                    this.noData = true
                }
            }
        })
    }

    // 邀请好友加载更多
    loadMore(data) {
        if (!data.length || this.page >= this.pageTotal) {
            this.hasMore = false
        } else {
            this.page++
            this.getInviteList()
        }
    }
    //获取海报和二维码
    getCode() {
        http.get('user-service/user/config/getNewInvoiceCode').then(res => {
            if (res.code === 200) {
                this.codeDetail = res.data
            }
        })
    }
    // 获取当前用户情况
    getUserDetail() {
        http.post('user-service/partybtc/getpartyrankseniority').then(res => {
            if (res.code === 200) {
                this.userDetail = res.data
            }
        })
    }
    goInvite() {
        console.log('4456')
    }
    show() {
        this.showRule = true
    }
    hide() {
        this.showRule = false
    }
    async processAsync() {
        let url = this.codeDetail.inviteUrl + '?inviteCode='+this.codeDetail.invoiceCode
        let bgUrl = require('../../common/image/haibao.png')
        // await this.props.share(url)
        // await this.props.draw(bgUrl, 'shareImg', '140', '435')
    }
}
</script>
<style scoped lang="scss">
@import 'index.scss'
</style>