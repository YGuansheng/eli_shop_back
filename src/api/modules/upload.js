export default ({ request }) => ({
  /**
   * @description 上传图片
   */
  UPLOAD_IMAGE (image) {
    const data = new FormData()
    data.append('file', image)
    return request({
      url: 'api/v1/admin/image',
      method: 'post',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  }
})
