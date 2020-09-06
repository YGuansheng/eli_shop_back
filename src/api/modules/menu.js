export default ({ request }) => ({
  /**
   * @description 菜单列表 只获取某级菜单下的数据
   * @param {Object} data {Number} parent 父级菜单 id
   */
  MENU_FIND (id = 0) {
    return request({
      url: '/api/menu/find_menus',
      method: 'post',
      data: {
        parent_id: id
      }
    })
  },
  /**
   * @description 菜单列表
   * @description 获取所有菜单的层级关系
   */
  MENU_ALL (query = {}) {
    return request({
      url: '/api/v1/admin/menus',
      method: 'get',
      params: query
    })
  },
  /**
   * @description 菜单列表
   * @description 当前用的的菜单列表
   */
  MENU_USER () {
    return request({
      url: '/api/v1/admin/menus',
      method: 'get'
    })
  },
  /**
   * @description 菜单创建
   */
  MENU_CREATE (data) {
    return request({
      url: '/api/v1/admin/menus/',
      method: 'post',
      data
    })
  },
  /**
   * @description 菜单详情
   */
  MENU_DETAIL (id) {
    return request({
      url: '/api/v1/admin/menus/' + id,
      method: 'get'
    })
  },
  /**
   * @description 菜单编辑
   */
  MENU_UPDATE (data) {
    return request({
      url: '/api/v1/admin/menus/' + data.id,
      method: 'put',
      data
    })
  },
  /**
   * @description 菜单删除
   */
  MENU_DELETE (id) {
    return request({
      url: '/api/v1/admin/menus/' + id,
      method: 'delete'
    })
  }
})
