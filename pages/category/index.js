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
  // 接口的返回值
  // 如果这数据不需要在页面中渲染，那么就没有必要放在data中
  // 因为小程序中会对data的数据进行传输，传输到视图层也就是wxml中 这样会导致页面会卡
  Cates: [],
  onLoad(){
    this.getCategoryList();
  },

  // 获取分类数据
  getCategoryList(){
    request({
      url: '/categories'
    })
    .then(result=>{
      // 给全局参数赋值
      this.Cates = result;
      // map返回数组
      let leftMenuList = this.Cates.map((v,i) => ({cat_name: v.cat_name, cat_id: v.cat_id}));
      let rightGoodsList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  },

  // 左侧菜单的点击事件
  handleMenuChange(e){
    const {index} = e.currentTarget.dataset;
    // 实现菜单的激活选中
    let rightGoodsList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightGoodsList
    })
  }
});
  