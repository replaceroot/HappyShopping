// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航数组
    navCateList: [],
    // 楼层数组
    floorList: []
  },
  // onLoad 页面开始加载
  onLoad() {
    this.getSwiperList();
    this.getNavCateList();
    this.getFloorList();
  },
  // 获取轮播图数据方法
  getSwiperList() {
    /* 发送请求获取数据 */
    wx.request({
      url: "https://api.zbztb.cn/api/public/v1/home/swiperdata",
      success: result => {
        // console.log(result.data.message);
        this.setData({
          swiperList: result.data.message
        });
      }
    });
  },

  // 获取分类导航数据方法
  getNavCateList() {
    wx.request({
      url: "https://api.zbztb.cn/api/public/v1/home/catitems",
      success: result => {
        // console.log(result.data.message);
        this.setData({
          navCateList: result.data.message
        });
      }
    });
  },

  // 获取楼层数据方法
  getFloorList() {
    wx.request({
      url: "https://api.zbztb.cn/api/public/v1/home/floordata",
      success: result => {
        console.log(result.data.message)
        this.setData({
          floorList: result.data.message
        })
      }
    });
  }
});
