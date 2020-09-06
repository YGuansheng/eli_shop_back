export default ({ request }) => ({

  /**
   * @description 商品列表
   * @description 获取分页商品数据
   */
  GOODS_ALL (query = {}) {
    return request({
      url: '/api/v1/admin/product',
      method: 'get',
      params: query
    }).then(ret => {
      // 在这里改造成crud所需要的结果
      ret.data = ret || {}
      return ret
    })
  },
  /**
   * @description 商品创建
   */
  GOODS_CREATE (data) {
    return request({
      url: '/api/v1/admin/product/',
      method: 'post',
      data
    })
  }
})
