export default ({ request }) => ({
  /**
   * @description 字典数据列表
   */
  DICTDATA_ALL (query = {}) {
    return request({
      url: '/api/v1/admin/dictData',
      method: 'get',
      params: query
    })
  },
  /**
   * @description 字典数据创建
   */
  DICTDATA_CREATE (data) {
    return request({
      url: '/api/v1/admin/dictData',
      method: 'post',
      data
    })
  },
  /**
   * @description 字典数据详情
   */
  DICTDATA_DETAIL (id) {
    return request({
      url: '/api/v1/admin/dictData/' + id,
      method: 'get'
    })
  },
  /**
   * @description 字典数据编辑
   */
  DICTDATA_UPDATE (data) {
    return request({
      url: '/api/v1/admin/dictData/' + data.id,
      method: 'put',
      data
    })
  },
  /**
   * @description 字典数据删除
   */
  DICTDATA_DELETE (id) {
    return request({
      url: '/api/v1/admin/dictData/' + id,
      method: 'delete'
    })
  }
})
