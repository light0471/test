/**
 * 小程序配置文件
 */

var host = 'http://10.52.200.165:3000';

var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    // 登录地址，用于建立会话
    list_yl: `${host}/list_yl`,
    save_yl: `${host}/save_yl`,
  }
};


module.exports = config;