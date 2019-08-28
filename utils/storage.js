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