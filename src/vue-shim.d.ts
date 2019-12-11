
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue;
}
//Tip:如果要识别第三方插件可以在此添加申明
import VueRouter from 'vue-router'
import {Route} from 'vue-router'
import http from './assets/js/http'
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route,
    $wx: any, //自定义微信接口
  }
}