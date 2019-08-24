//Page Object
import {request} from '../../request/index.js';
Page({
  /* 页面的初始数据 */
  data: {
    // 左侧的菜单数组
    leftMenuList: [],
    // 右侧商品内容数组
    rightGoodsList: [],
    // 选中的菜单
    currentIndex: 0
  },
  onLoad(){
    this.getCategoryList();
  },

  // 获取分类数据
  getCategoryList(){
    request({
      url: '/categories'
    })
    .then(result=>{
      console.log(result);
      // map返回数组
      let leftMenuList = result.map((v,i) => ({cat_name: v.cat_name, cat_id: v.cat_id}));
      let rightGoodsList = result[0].children;
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  }
});
  