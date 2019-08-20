// pages/index/index.js
import { request } from "../../request/index.js";
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
    request({
      url: "/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result
      });
    });
  },

  // 获取分类导航数据方法
  getNavCateList() {
    request({
      url: "/home/catitems"
    }).then(result => {
      this.setData({
        navCateList: result
      });
    });
  },

  // 获取楼层数据方法
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(result => {
      this.setData({
        floorList: result
      });
    });
  }
});
