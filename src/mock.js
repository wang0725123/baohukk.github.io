import Mock from 'mockjs' // 安装的mockjs，而不是mock.js
const Random = Mock.Random; // 获取 mock.Random 随机对象
// 模拟一组数据
const orderList = (params) => {
    const dataList = []
    for (let i = 0; i < 100; i++) {
        const newObject = {
            id: Random.integer(0), // 生成随机数，最小值是0
            title: Random.csentence(10, 30), // 生成随机文本，字数在10-30之间
            date: Random.datetime('yyyy-MM-dd hh:mm:ss'), // 格式化日期
            link: Random.url(), // 生成随机网址
        }
        dataList.push(newObject)
    }
    const { page, pageSize } = params
    const total = dataList.length
    const len = total / pageSize
    const totalPage = Number.isInteger(len) ? len + 1 : len
    // const list = dataList.slice((page - 1) * pageSize, page * pageSize)
    const list = dataList
    return {
        data: {
            page,
            pageSize,
            total,
            totalPage,
            list,
            code: 200,
            message: 'success'
        }
    }
}
Mock.mock('/api/list', 'get', orderList);

export default Mock;