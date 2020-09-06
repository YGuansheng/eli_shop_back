/**
 * 导出需要后台接口PATH
 */
export const apiRoutes = {
  Login: 'api/v1/admin/login', // 后台用户登录
  Logout: 'api/v1/admin/logout', // 后台用户退出
  Menus: 'api/v1/admin/menus', // 获取菜单
  captchaCheck: 'api/v1/admin/captcha/check', // 验证验证码
  tokenCheck: 'api/v1/admin/token/check' // 验证验证码
}
