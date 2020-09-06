export default ({ request }) => ({
  /**
   * @description 登录
   */
  USER_LOGIN ({
    username = '',
    password = ''
  }) {
    return request({
      url: '/api/v1/admin/login',
      method: 'post',
      data: {
        username: username,
        password: password
      }
    })
  },
  /**
   * @description 注销
   */
  USER_LOGOUT () {
    return request({
      url: '/api/v1/admin/logout',
      method: 'post'
    })
  },
  /**
   * @description Token 校验
   */
  USER_CHECK_TOKEN () {
    return request({
      url: 'api/v1/admin/token/check',
      method: 'post'
    })
  },
  /**
   * @description 查询所有用户
   */
  USER_ALL (query = {}) {
    return request({
      url: '/api/v1/admin/admin',
      method: 'get',
      params: query
    })
  },
  /**
   * @description 用户创建
   */
  USER_CREATE (data) {
    return request({
      url: '/api/v1/admin/admin',
      method: 'post',
      data
    })
  },
  /**
   * @description 用户详情
   */
  USER_DETAIL (id) {
    return request({
      url: '/api/v1/admin/admin/' + id,
      method: 'get'
    })
  },
  /**
   * @description 用户编辑
   */
  USER_UPDATE (data) {
    return request({
      url: '/api/v1/admin/admin/' + data.id,
      method: 'put',
      data
    })
  },
  /**
   * @description 用户删除
   */
  USER_DELETE (id) {
    return request({
      url: '/api/v1/admin/admin/' + id,
      method: 'delete'
    })
  }
})
