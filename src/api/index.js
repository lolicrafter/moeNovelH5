import request from '@/lib/request'

export default {
    // 早鸟海报生成
    addMessageInfo(data) {
        return request({
            url: 'message/info/addMessageInfo',
            method: 'post',
            data,
        })
    }
}