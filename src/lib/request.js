import axios from 'axios'
// import {
//     Message
// } from 'element-ui';


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 300000
})

// request拦截器
service.interceptors.request.use(
    config => {
        // if (getToken()) {
        //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        // }
        if (!config.headers.agent) {
            config.headers['agent'] = 'lolicraft'
        }
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(res => {
    // console.log('响应拦截器结果===>',res)
        const code = res.data.code
        if (code !== 200) {
            // Message.error(res.data.msg);
            // Loading.service().close()
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error)
        // Message.error(error.message);
        return Promise.reject(error)
    }
)

export default service