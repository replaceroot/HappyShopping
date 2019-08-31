
/* 
  1 动态渲染的商品应该是 checked=true的这些商品
  2 获取订单编号
    0 判断有没有token
      如果没有token
        1 都是跳转到授权页面 进行获取成功再重新跳回支付页面
        2 先获取用户信息
        3 执行小程序登录获取code属性
      有token
        直接走业务流程
*/

import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  data: {
    address: {},
    cart: {},
    totalNum: 0,
    totalPrice: 0,
  },
  // 页面切换显示的时候 触发 onShow
  onShow() {
    // 1 获取本地存储中的 收货地址数据 默认值 空字符串
    const address = wx.getStorageSync("address") || {};
    // 获取购物车数据
    const cart = wx.getStorageSync("cart") || {};
    // 2 把address存入data中
    this.setData({ address });
    this.setCart(cart);
  },

  // 设置购物车数据和设置总价格
  setCart(cart) {
    // 0 把购物车对象转成数组
    let cartArr = Object.values(cart);

    let totalPrice = 0;
    // 3 计算总数量
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    this.setData({ cart, totalPrice, totalNum });
  },

  // 点击支付按钮
  handleOrderPay(){
    // 获取token
    const token = wx.getStorageSync("token")
    // 判断是否存在
    if(!token){
      // 跳转到授权页面
      wx.wx.navigateTo({
        url: '/pages/auth/index',
      });
    }else{
      // 有token 直接写逻辑
      console.log("有 token");
    }
  }
});
