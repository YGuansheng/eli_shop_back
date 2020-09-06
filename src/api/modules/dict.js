export default ({ request }) => ({
  /**
   * @description 字典列表
   */
  DICT_ALL (query = {}) {
    return request({
      url: '/api/v1/admin/dict',
      method: 'get',
      params: query
    })
  },
  /**
   * @description 字典创建
   */
  DICT_CREATE (data) {
    return request({
      url: '/api/v1/admin/dict',
      method: 'post',
      data
    })
  },
  /**
   * @description 字典详情
   */
  DICT_DETAIL (id) {
    return request({
      url: '/api/v1/admin/dict/' + id,
      method: 'get'
    })
  },
  /**
   * @description 字典编辑
   */
  DICT_UPDATE (data) {
    return request({
      url: '/api/v1/admin/dict/' + data.id,
      method: 'put',
      data
    })
  },
  /**
   * @description 字典删除
   */
  DICT_DELETE (id) {
    return request({
      url: '/api/v1/admin/dict/' + id,
      method: 'delete'
    })
  }
})
