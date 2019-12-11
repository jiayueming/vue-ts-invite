<template>
  <div class="invite-container">
		<div class="bg"></div>
		<div class="head">
			<div class="inner-header">
				<div class="top" @click="goIndex">
					<div class="avatar">
						<img :src="personInfo.headPhoto" alt="" />
					</div>
					<div class="personInfo">
						<p><span class="mobile">{{personInfo.phone}}</span><span class="vipClass">{{personInfo.vip}}</span></p>
						<p class="info">{{personInfo.vipInvitationMes}}</p>
					</div>
					<div class="narrow">
						<img src="../../common/image/narrow@2x.png" alt="" />
					</div>
				</div>
				<div class="bottom">
					<div class="left">
						<p>一级邀请</p>
						<p>二级邀请</p>
					</div>
					<div class="line"></div>
					<div class="right">
						<div class="one">
							<p class="title">邀请人数</p>
							<p class="mb73 inviteData">{{personInfo.seInvitationVO.sunCount}}</p>
							<p class="inviteData">{{personInfo.thInvitationVO.sunCount}}</p>
						</div>
						<div class="two">
							<p class="title">已实名</p>
							<p class="mb73 inviteData">{{personInfo.seInvitationVO.identityCount}}</p>
							<p class="inviteData">{{personInfo.thInvitationVO.identityCount}}</p>
						</div>
						<div class="thr">
							<p class="title">一级收益</p>
							<p class="mb73 inviteData">{{personInfo.seInvitationVO.invitationTool}}</p>
							<p class="inviteData">{{personInfo.thInvitationVO.invitationTool}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="shareCode">
				<p class="name">邀请码</p>
				<p class="code">
				<input readOnly :value="personInfo.inviteCode" type="text" id="address"/></p>
				<p class="copyBox" data-clipboard-action="copy"
					data-clipboard-target="#address" @click="copy">
					<span class="copyIcon"></span><span>复制</span></p>
			</div>
			<div class="shareBtn">立即分享</div>
		</div>
  </div>
</template>

<script lang="ts">
import http from '../../assets/js/http'
import ClipboardJS from 'clipboard'
import { Vue, Component } from 'vue-property-decorator'
@Component
/* eslint-disable */
export default class Invite extends Vue {
	list:Array<any> = [];
	personInfo:any = {
		seInvitationVO: {},
		thInvitationVO: {}
	};
	chooseTitle:object[] = [
		{name: '一级邀请'},
		{name: '二级邀请'}
	];
	inviteClass:string = '1'
	// 声明周期钩子
	created () {
		this.getRank()
		this.getInfo()
	}
	// 方法
	getRank () {
		http.post('user-service/user/getinvitationrank', {
			topThree: true
		}).then(res => {
			if (res.code === 200) {
				this.list = res.data
			}
		})
	}
	getInfo () {
		http.post('user-service/user/getinvitationinfo').then(res => {
			if (res.code === 200) {
				this.personInfo = res.data
				console.log('==', this.personInfo.seInvitationVO.sunCount)
			}
		})
	}
	copy () {
		let clipboard = new ClipboardJS('.copyBox')
		clipboard.on('success', (e) => {
			console.info('Action:', e.action)
			console.info('Text:', e.text)
			e.clearSelection()
		})
		clipboard.on('error', (e) => {
			console.error('Action:', e.action)
			console.error('Trigger:', e.trigger)
		})
	}
	goTool () {
		this.$router.push('/inviteData')
	}
	choose (par) {
		if (par === '1') {
			this.inviteClass = '1'
		} else {
      this.inviteClass = '2'
		}
	}
	goIndex () { this.$router.push('/index') }
}
</script>
<style scoped lang="scss">
@import 'index.scss'
</style>
