// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs标签的标题数组
    tabs: [
      {id:0,title:"综合",isActive:true},
      {id:1,title:"销量",isActive:false},
      {id:2,title:"价格",isActive:false},
    ]
  },
  // 页面开始加载的时候触发 形参中可以获取到页面的url参数
  onLoad(options){
    console.log(options);
  },
  // 改变tabs标题的选中效果
  handleTitleChange(e){
    // 先获取子组件传递过来的数据
    const {index} = e.detail
    // 获取原数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
    
  }
})