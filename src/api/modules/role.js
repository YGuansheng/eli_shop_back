export default ({ request }) => ({
  /**
   * @description 角色列表
   */
  ROLE_ALL (query = {}) {
    return request({
      url: '/api/v1/admin/role',
      method: 'get',
      params: query
    })
  },
  /**
   * @description 角色创建
   */
  ROLE_CREATE (data) {
    return request({
      url: '/api/v1/admin/role',
      method: 'post',
      data
    })
  },
  /**
   * @description 角色详情
   */
  ROLE_DETAIL (id) {
    return request({
      url: '/api/v1/admin/role/' + id,
      method: 'get'
    })
  },
  /**
   * @description 角色编辑
   */
  ROLE_UPDATE (data) {
    return request({
      url: '/api/v1/admin/role/' + data.id,
      method: 'put',
      data
    })
  },
  /**
   * @description 角色删除
   */
  ROLE_DELETE (id) {
    return request({
      url: '/api/v1/admin/role/' + id,
      method: 'delete'
    })
  }
})
