/* 
  1 点击轮播图 调出图片预览功能
    1 绑定点击事件

*/

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
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg' ),
        pics: res.pics
      }
    })
  },

  // 点击图片进行大屏预览
  handlePreviewImage(){
    // 返回新数组
    const urls = this.data.goodsObj.pics.map(v=>v.pics_big);
    const current = urls[0];
    wx.previewImage({
      current,
      urls
    });
      
  }
})