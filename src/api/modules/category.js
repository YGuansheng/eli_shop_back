export default ({ request }) => ({
  /**
   * @description 分类列表
   * @description 获取所有分类的层级关系
   */
  CATEGORY_ALL (query = {}) {
    return request({
      url: '/api/v1/admin/category',
      method: 'get',
      params: query
    })
  },
  /**
   * @description 分类创建
   */
  CATEGORY_CREATE (data) {
    return request({
      url: '/api/v1/admin/category/',
      method: 'post',
      data
    })
  },
  /**
   * @description 分类详情
   */
  CATEGORY_DETAIL (id) {
    return request({
      url: '/api/v1/admin/category/' + id,
      method: 'get'
    })
  },
  /**
   * @description 分类编辑
   */
  CATEGORY_UPDATE (data) {
    return request({
      url: '/api/v1/admin/category/' + data.id,
      method: 'put',
      data
    })
  },
  /**
   * @description 分类删除
   */
  CATEGORY_DELETE (id) {
    return request({
      url: '/api/v1/admin/category/' + id,
      method: 'delete'
    })
  }
})
