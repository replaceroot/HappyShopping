/* 
  1 点击授权按钮
    1 获取用户信息 调用小程序 内置 getUserInfo
      要获取 signature iv rawData encryptedData 4个参数
    2 执行微信小程序登录 wx.login返回
      code属性
  2 根据以上数据 调用第三方的登录 /v1/users/wxlogin
    1 成功之后 返回 用户的token -令牌 身份证。。
    2 把token存入到本地存储中方便其他页面使用
  3 重新跳回上一个页面
*/

import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
import {wxLogin} from '../../utils/asyncWx'
Page({
    // 1 获取用户信息
    async getUserInfo(e){
      // 获取用户的signature iv rawData encryptedData
      const {signature, iv, rawData, encryptedData} = e.detail;
      // console.log(e.detail);
      // 执行小程序的登录
      const {code} = await wxLogin();
      let postParams = {signature, iv, rawData, encryptedData, code};
      // 发送请求到第三方的服务器 来获取真正的token
      const res = await request({url:'/users/wxlogin', data:postParams, method: "post"});
      console.log(res)
      // console.log(token);
      // 存入token
      // wx.setStorageSync('token', token);

      // 跳转到上一个页面
      wx.navigateBack({
        // delta 表示上几个页面
        delta: 1
      });
        
    }
});
