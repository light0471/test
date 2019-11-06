//const base_url = 'https://www.wanandroid.com'

const request = function (method) {

  return (obj, obj_method) => {
    
    wx.request({
      url: encodeURI(obj.url),
      method: method,
      data: obj.data,
      //header: header,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.items) {
          let res_json = JSON.parse(decodeURIComponent(res.data.items));
          res.data.items = res_json
        }
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