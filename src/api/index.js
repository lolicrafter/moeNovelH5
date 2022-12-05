import request from '@/lib/request'
const fetchArticleList = function(params) {
    return request({
        url: 'article/list',
        method: 'get',
        params,
    })
}
const fetchCategoryList = function(params) {
    return request({
        url: 'category/list',
        method: 'get',
        params,
    })
}
const fetchTagsList = function(params) {
    return request({
        url: 'tags/list',
        method: 'get',
        params,
    })
}
export  {
    fetchArticleList,
    fetchTagsList,
    fetchCategoryList
}