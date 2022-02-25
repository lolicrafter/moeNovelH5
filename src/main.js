import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
console.log('process.env==>', process.env)
router.beforeEach((to, from, next) => {
    console.log('to结果===>', to)
    /* 路由发生变化修改页面title */
    if (to.meta.title || to.query.title) {
        document.title = to.meta.title || to.query.title
    }
    next()
})

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')