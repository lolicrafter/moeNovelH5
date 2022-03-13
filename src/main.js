import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as Icons  from '@element-plus/icons-vue/dist/index.js'
import 'element-plus/dist/index.css'
const app = createApp(App)


import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'


console.log('process.env==>', process.env)
// router.beforeEach((to, from, next) => {
//     console.log('to结果===>', to)
//     /* 路由发生变化修改页面title */
//     if (to.meta.title || to.query.title) {
//         document.title = to.meta.title || to.query.title
//     }else{
//         document.title = '往生堂胡桃'
//     }
//     next()
// })
// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
  })
app.use(store).use(router).use(ElementPlus).use(OpenLayersMap).mount('#app')