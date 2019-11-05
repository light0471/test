import * as echarts from '../../../../ec-canvas/echarts';
var config = require('../../../utils/config.js');
var http = require('../../../utils/http.js');

const app = getApp();

function initChart(canvas, width, height, work) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    dataset: {
      source: [
        ['人', 'product'],
        [(work['v_5'] ? work['v_5'] : 0), '其他'],
        [(work['v_4'] ? work['v_4'] : 0), '忻州西站'],
        [(work['v_3'] ? work['v_3'] : 0), '忻州站'],
        [(work['v_2'] ? work['v_2'] : 0), '太原站'],
        [(work['v_1'] ? work['v_1'] : 0), '太原南站'],
        [(work['v_0'] ? work['v_0'] : 0), '太原武宿机场']
      ]
    },
    grid: { containLabel: true },
    xAxis: { name: '人' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['高', '低'],
      dimension: 0,
      inRange: {
        color: ['#D7DA8B', '#E15457']
      }
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: '人',
          // Map the "product" column to Y axis
          y: 'product'
        }
      }
    ]
  };


  chart.setOption(option);
  return chart;
}

function work_count (arrs) {
  let work = {}
  for (let obj of arrs) {
    work["v_" + obj.v_distination] = obj.count
  }
  return work
} 

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
    }
  },
  back() {
    wx.navigateBack();
  },
  onReady() {
  },
  onLoad: function (options) {
    var that = this;
  },
  echartInit(e) {
    http.post({
      url: config.service.count_cx,
      data: {}
    }, (res) => {
      if (res.data.errcode == 0) {
        let work = work_count(res.data.items)
        console.log('work',work)
        console.log('work', (work['v_0'] ? 0 : work['v_0']))
          
        initChart(e.detail.canvas, e.detail.width, e.detail.height, work);
      }
    })
    
  }
});
