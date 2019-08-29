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
*/

Page({
  // 获取收货地址
  handleChooseAddress() {
    // 1 获取用户对小程序的授权信息
    wx.getSetting({
      success: result => {
        // 获取到授权信息
        const scopeAddress = result.authSetting["scope.address"];
        // 用户授权过 或者 用户重来没有调用过收货地址
        if (scopeAddress === true || scopeAddress === undefined) {
          // 1.1 调用收货地址
          wx.chooseAddress({
            success: result2 => {
              console.log(result2);
            }
          });
        } else {
          // 2.1用户点击拒绝收货地址 诱导用户 打开授权页面 再调用收货地址
          wx.openSetting({
            success: () => {
              // 2.2 再去调用 获取收货地址
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3);
                }
              });
                
            }
          });
            
        }
      }
    });
  }
});
