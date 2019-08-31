/* 
  获取商品分类数据
*/
export const getStorageCates = ()=>{
  return wx.getStorageSync("cates");
}

/**
 * 把商品分类数据存入到本地存储 
 * @param {Object} obj 要存入的信息
 */
export const setStorageCates = (obj)=>{
  wx.setStorageSync("cates", obj);
}

/**
 *  设置购物车
 * @param {Object} obj 
 */
export const setStorageCart = (obj)=>{
  wx.setStorageSync("cart", obj);
}

/**
 * 获取购物车数据
 */
export const getStorageCart = ()=>{
  return wx.getStorageSync("cart");
}

/**
 *  设置收货地址信息
 * @param {Object} obj 
 */
export const setStorageAddress = (obj)=>{
  wx.setStorageSync("address", obj);
}

/**
 * 获取收货地址信息
 */
export const getStorageAddress = ()=>{
  return wx.getStorageSync("address");
}