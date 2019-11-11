//const base_url = 'https://www.wanandroid.com'

const request = function (method) {

  return (obj, obj_method) => {
    
    wx.request({
      url: encodeURI(obj.url),
      method: method,
      data: obj.data,
      //header: header,
      success: (res) => {
        if (obj_method) {
          obj_method(res)
        }
      },
      fail: () => {
        
      },
      complete: () => {
        // util.hideLoading()
      }
    })
  }
}

module.exports = {
  get: request('GET'),
  post: request('POST'),
  delete: request('DELETE'),
  put: request('PUT')
}