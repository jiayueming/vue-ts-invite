import { Component, Vue } from 'vue-property-decorator'
import * as QRCode from 'qrcode'
import util from '../js/util'
import JsBridge from '../js/jsBridge.js'
declare module 'vue/types/vue' {
    interface Vue {
        codeUrl:string 
        isShare:boolean
        shareImg:string
        share (initurl: any): void
        draw (bgUrl: string, key: any, x: number, y: number): any
    }
}
@Component
export class MyMixin extends Vue{
    codeUrl:string = ''
    isShare:boolean = false
    shareImg:string = ''
    public share(initurl: any) {
        QRCode.toDataURL(initurl).then(url => {
            this.codeUrl = url
        })
    }
    // canvas合成海报
    public draw(bgUrl: string, key: any, x: number, y: number) {
        const c = document.getElementById('canvas')
        const ctx = (c as any).getContext('2d')
        const img = new Image()
        const img2 = new Image()
        ctx.rect(0, 0, 400, 700)
        img.setAttribute('crossOrigin','anonymous')
        img2.setAttribute('crossOrigin','anonymous')
        img.src = bgUrl
        img2.src = this.codeUrl
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 400, 700)
          ctx.drawImage(img2, x, y, 120, 120)
          const postUrl = (c as any).toDataURL('image/png', .2) // 生成的图片url(base64)
          this.isShare = true
          this[key] = postUrl
          // 调用原生分享
          const shareInfo = {
            shareImageUrl: postUrl.replace('data:image/png;base64,', '')
          } 
          if(util.deviceType() === 'A') { // and分享
            JsBridge.jsBridge('selectTheImage',shareInfo)
            JsBridge.jsBridge('interceptBack',{isIntercept: true})
          }
        }
    }
     
}