// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[]
  },
  // onLoad 页面开始加载
  onLoad(){
    this.getSwiperList();
  },
  // 获取轮播图数据方法
  getSwiperList(){
    /* 发送请求获取数据 */
    var reqTask = wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      
      success: (result) => {
        console.log(result.data.message);
        this.setData({
          swiperList: result.data.message
        })
      },
    });
      
  }

})