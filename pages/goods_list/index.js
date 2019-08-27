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
  3 下拉刷新
    1 触发下拉刷新的事件
      1 需要在页面json文件中开启 允许下来配置
      2 页面js中 添加一个 下拉刷新事件 
      3 可能需要在app.json文件中 修改下拉刷新小圆点的颜色。。。
    2 实现刷新逻辑
      1 重置 pagenum
      2 重置data中的数组 goodsList = []
      3 重新发送请求!!!
        1 pagenum = 1
        2 会对goodsList = [] 重新赋值!!!
      4 当数据请求回来了 需要手动关闭下拉刷新窗口 wx.stopPullDownRefresh()

  4 添加一个全局的正在加载中效果
    1 效果是哪个代码决定
    2 思考在哪里进行调用会比较方便
      -1 axios 请求拦截器
      0 封装过一个发送请求的代码 request
      1 发送异步请求之前显示
      2 异步请求成功 就关闭
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
      this.setData({
        // 为了做加载下一页 改成拼接  先解构旧的数组 再解构新的数组
        goodsList: [...this.data.goodsList, ...res.goods]
      })
      // 关闭下拉刷新窗口
      //  1 界面第一次打开的时候 没有调用下拉刷新窗口就直接关闭
      //  2 下拉刷新没有打开 也可以关闭
      wx.stopPullDownRefresh();
    })
  },

  // 滚动条触底，上拉加载下一页 事件
  onReachBottom(){
    // 先判断有没有下一页数据
    if(this.QueryParams.pagenum >= this.TotalPages){
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
      });
        
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 页面下拉刷新事件
  onPullDownRefresh(){
    // 1 重置页码
    // 2 重置data中的数组
    // 3 重新发送请求

    this.QueryParams.pagenum = 1;
    this.setData({
      goodsList: []
    });
    this.getGoodsList();
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
