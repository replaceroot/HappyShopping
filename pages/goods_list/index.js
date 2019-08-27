// pages/goods_list/index.js
/* 
  1 发送请求 获取商品列表数据
    1 
*/

import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tabs标签的标题数组
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false }
    ],
    // 页面要渲染的商品数组
    goodsList: [],
  },

  // 全局 接口参数 方便修改
  QueryParams: {
    // 关键字 小米，华为。。。可以为空字符串
    query: "",
    // 分类ID
    cid: "",
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10
  },

  // 页面开始加载的时候触发 形参中可以获取到页面的url参数
  onLoad(options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  getGoodsList() {
    request({
      url: "/goods/search",
      data: this.QueryParams
    }).then(res=>{
      console.log(res);
      this.setData({
        goodsList: res.goods
      })
    })
  },

  // 改变tabs标题的选中效果
  handleTitleChange(e) {
    // 先获取子组件传递过来的数据
    const { index } = e.detail;
    // 获取原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabs
    });
  }
});
