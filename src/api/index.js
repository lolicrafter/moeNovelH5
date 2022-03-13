import request from '@/lib/request'
const fetchArticleList = function(params) {
    return request({
        url: 'article/list',
        method: 'get',
        params,
    })
}
export  {
    fetchArticleList
}