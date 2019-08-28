// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情对象
    goodsObj: {}
  },

  onLoad(options){
    this.getGoodsDetail(options.goods_id);
  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id){
    const res = await request({url:"/goods/detail", data:{goods_id}});
    this.setData({
      // 只存放要用到的数据
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce,
        pics: res.pics
      }
    })
  }
})