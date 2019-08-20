export const request = params => {
  // 统一的接口前缀
  const baseUrl = "https://api.zbztb.cn/api/public/v1";
  return new Promise((reslove, reject) => {
    wx.request({
      // 结构params参数
      ...params,
      url: baseUrl + params.url,
      success: result => {
        /* 调用回调函数返回数据 */
        reslove(result.data.message);
      },
      fail: error => {
        reject(error);
      }
    });
  });
};
