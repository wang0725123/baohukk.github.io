import request from './../utils/request'


// 获取mock信息
export function getData(params) {
    return request({
        url: `/api/list`,
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    })
}