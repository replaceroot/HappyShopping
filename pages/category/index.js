//Page Object
import {request} from '../../request/index.js';

/* 
1 页面的初次动态渲染
2 点击左侧菜单 菜单切换选中 同时 右侧的商品内容切换显示
  1 绑定点击事件
  2 左侧菜单的激活在data中的currentIndex
  3 右侧商品内容跟着改变

3 切换商品内容的时候需要让右侧的容器的滚动条重新回到顶部 设置滚动条的距离。 
  1 以前的dom可以直接操作滚动条的属性 dom.scrollTop = 0
  2 scroll-view标签的scrollTop属性
  3 右侧内容切换的时候 再手动给他赋值即可

*/

Page({
  /* 页面的初始数据 */
  data: {
    // 左侧的菜单数组
    leftMenuList: [],
    // 右侧商品内容数组
    rightGoodsList: [],
    // 选中的菜单
    currentIndex: 0,
    // 右侧滚动条的距离
    scrollTop: 0
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
      rightGoodsList,
      scrollTop:0
    })
  }
});
  