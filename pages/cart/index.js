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
4 购物车的选中切换
  1 绑定change事件 给它父元素绑定checkbox-group 同时传递参数goods_id
  2 事件的回调
    1 获取要修改的购物车商品的goods_id
    2 获取data中的cart对象
    3 进行选中状态的取反
    4 调用封装好的setCart方法即可
    5 setCart做了两件事
      1 根据传入的cart对象 来重新计算总价格、总数量
      2 把cart设置到data中和缓存中
5 点击全选的时候 所有的商品状态跟着改变
  1 绑定change事件 checkbox-group
  2 获取data中的isAllCheck属性
  3 直接给isAllCheck属性取反
  4 要让页面所有的商品跟随改变
  5 把修改后的cart又填充会data和缓存中  setCart()

6 修改数量功能
  1 给 + - 号绑定同一个事件 同时传递一个操作符 +1 还是 -1 还需要传递要操作的商品id
  2 获取data中的购物车对象cart
  3 根据 操作符 +1 还是 -1
    cart[id].num += 操作符;
  4 当前点击的 -1 按钮同时购物车的数量等于1的时候
    1 弹窗 确认框 是否要删除
      1 取消 就什么都不做
      2 确定 执行删除操作
  5 调用this.setCart(cart);
*/

import regeneratorRuntime from "../../lib/runtime/runtime";
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal
} from "../../utils/asyncWx";
Page({
  data: {
    address: {},
    cart: {},
    isAllChecked: false,
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
    address.all =
      address.provinceName +
      address.cityName +
      address.countyName +
      address.detailInfo;
    // 3把收货地址存入到本地存储中
    wx.setStorageSync("address", address);
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

    // 1 计算是否都选中了
    // every 会接收一个回调函数 当每个循环项都返回true的时候 整个cartArry的返回值才会为true
    let isAllChecked = cartArr.every(v => v.checked);
    // 2 计算总价格 只计算勾选的商品价格
    let totalPrice = 0;
    // 3 计算总数量
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    this.setData({ cart, isAllChecked, totalPrice, totalNum });
    wx.setStorageSync("cart", cart);
  },

  // 监听checkbox状态改变
  handleCheckChange(e) {
    // 获取购物车中商品的id
    let { goodsid } = e.currentTarget.dataset;
    // 获取data中的cart对象
    let { cart } = this.data;
    // 进行状态的取反
    cart[goodsid].checked = !cart[goodsid].checked;
    // 调用封装好的setCart方法
    this.setCart(cart);
  },

  // 监听全选按钮状态改变
  handleAllCheck() {
    let { cart, isAllChecked } = this.data;
    isAllChecked = !isAllChecked;
    // 修改购物车的总商品的选中状态
    for (const key in cart) {
      // 对象有些属性是自己的 有些事原型链上的!!
      // 当属性是自身的 就可以继续执行
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = isAllChecked;
      }
    }
    this.setCart(cart);
  },

  // 购物车数量的编辑功能
  async handleCartNumEdit(e) {
    // 获取页面传递过来的参数
    let { id, operation } = e.currentTarget.dataset;

    let { cart } = this.data;

    // 判断正常的修改数量还是删除
    if (operation === -1 && cart[id].num === 1) {
      // 弹窗提示是否要删除
      const res = await showModal({ content: "您确定要删除吗?" });
      if (res.confirm) {
        // 点击确定，删除购物车中的商品 本质删除对象的一个属性而已!!!
        delete cart[id];
        this.setCart(cart)
      }
    } else {
      // 修改要购买的商品数量
      // operation = +1 或者 = -1
      cart[id].num += operation;
      // 让页面跟着发生改变
      this.setCart(cart);
    }
  }
});
