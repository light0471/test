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
    list_cx: `${host}/list_cx`,
    save_cx: `${host}/save_cx`,
    count_cx: `${host}/count_cx`,
    list_qd: `${host}/list_qd`,
    save_qd: `${host}/save_qd`,
    list_yjfk: `${host}/list_yjfk`,
    save_yjfk: `${host}/save_yjfk`,
  }
};


module.exports = config;