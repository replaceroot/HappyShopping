// pages/goods_list/index.js
/* 
  1 发送请求 获取商品列表数据
  2 上拉加载下一页
    1 什么时候触发上拉下载下一页 也是滚动条触底才触发事件
      onReachBottom 存在于小程序的页面生命周期中
    2 先判断有没有下一页数据
      1 当前页码 和 总页码比较
        当前的页码 >= 总页数 （未知）
        总页数 = Math.ceil(总的条数 / 页容量)
          21 / 10 = 2.1 = 3（向上取整）
        当前的页码 >= 总页数 没有下一页数据
      2 什么地方写获取总页数代码？
        接口请求成功之后 有了total属性之后就可以获取
    3 有下一页数据
      pagenum++;
      发送请求。。
        不能再对goods_list全部替换了
        对旧的数组进行拼接
    4 没有下一页
      弹出提示
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

  // 总页数
  TotalPages:1,

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
      // 计算总页数
      this.TotalPages = Math.ceil(res.total / this.QueryParams.pagesize);
      console.log(this.TotalPages);
      this.setData({
        // 为了做加载下一页 改成拼接  先解构旧的数组 再解构新的数组
        goodsList: [...this.data.goodsList, ...res.goods]
      })
    })
  },

  // 滚动条触底，上拉加载下一页 事件
  onReachBottom(){
    // 先判断有没有下一页数据
    if(this.QueryParams.pagenum >= this.TotalPages){
      console.log("没有下一页数据");
    }else{
      console.log("还有下一页数据")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
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
