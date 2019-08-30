/* 
1 点击按钮获取收货地址
  1 调用wx的api  wx.chooseAddress -> 弹出对话框
    1 点击允许 直接获取值就ok
    2 点击取消。。 下次再点击就没有任何效果
  
  2 先获取用户对该小程序的授予权限的信息 getSetting
    1 已经授权了 直接调用收货地址 接口代码
      返回值是true
    2 没有授权
      1 用户重来没有点击过 按钮 授权返回值 unidefind
      2 用户点击了取消 按钮，授权返回值为false
  3 假设授权信息是true或者 undefined
    1 直接调用获取收货地址的api
    2 假设授权信息是false(用户明确不授权)
      1 诱导用户打开授权页面 等用户重新给予权限之后再调用获取收货地址
2 页面一打开的时候 判断
    0 onLoad onShow (要使用的)
    1 本地存储中有没有收货地址 如果有 把地址赋给 data中的数据
    2 此时wxml页面就可以根据data中的数据进行页面标签的显示和隐藏

3 页面的数据动态渲染
  0 在购物车页面新增购物车商品的时候
    1 新增了数量和选中状态
  1 要渲染收货地址
  2 渲染购物车数据
  3 渲染全选 总价格 和 购物总数量
    1 当用户手动的修改了 购买的数量 和选中的状态 
      1都会重新修改data中的cart对象，把cart对象重新赋值到本地存储中
    2 经过分析 每当用户手动修改了购买的数量 和选中的状态 
      1 都需要修改data中的cart和缓存中的cart
      2 都需要重新计算总价格和购物总数量
    3 封装一个方法
      1 修改data和缓存数据
      2 计算总价格
      
*/

import regeneratorRuntime from "../../lib/runtime/runtime";
import { getSetting, openSetting, chooseAddress } from "../../utils/asyncWx";
Page({
  data: {
    address: {},
    cart: {},
    isAllChecked:false,
    totalNum: 0,
    totalPrice: 0
  },
  // 获取收货地址
  async handleChooseAddress() {
    // const scopeAddress = result.authSetting["scope.address"];
    // 1 获取到授权信息
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    // 2 对授权信息做判断
    if (scopeAddress === true || scopeAddress === undefined) {
      // 2.1 直接调用获取收货地址的api
      // const res2 = await chooseAddress();
    } else {
      // 2.2 诱导用户打开授权页面
      await openSetting();
    }
    const address = await chooseAddress();
    // 拼接完整的地址
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    // 3把收货地址存入到本地存储中
    wx.setStorageSync('address', address);
  },

  // 页面切换显示的时候 触发 onShow
  onShow(){
    // 1 获取本地存储中的 收货地址数据 默认值 空字符串
    const address = wx.getStorageSync("address") || {};
    // 获取购物车数据
    const cart = wx.getStorageSync('cart') || {};
    // 2 把address存入data中
    this.setData({address})
    this.setCart(cart);
  },

  // 设置购物车数据和设置总价格
  setCart(cart){
    // 0 把购物车对象转成数组
    let cartArr = Object.values(cart);

    // 1 计算是否都选中了
    // every 会接收一个回调函数 当每个循环项都返回true的时候 整个cartArry的返回值才会为true
    let isAllChecked = cartArr.every(v=>v.checked);
    console.log(isAllChecked);
    // 2 计算总价格 只计算勾选的商品价格
    let totalPrice = 0;
    // 3 计算总数量 
    let totalNum = 0;
    cartArr.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    this.setData({cart, isAllChecked, totalPrice, totalNum})
    wx.setStorageSync('cart', cart);
  }
});
