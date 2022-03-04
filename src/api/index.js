import request from '@/lib/request'

// export default {
//     // 获取用户列表
//     fetchUserList(params) {
//         return request({
//             url: 'users/list',
//             method: 'get',
//             params,
//         })
//     }
// }
const fetchUserList = function(params) {
    console.log('params结果===>',params)
    return request({
        url: 'users/list',
        method: 'get',
        params,
    })
}
export  {
    fetchUserList
}