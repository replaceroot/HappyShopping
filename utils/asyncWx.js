/**
 * promise的 wx.getSetting
 */
export const getSetting = ()=>{
  return new Promise((resolve, reject)=>{
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

/**
 * promise的 wx.chooseAddress
 */
export const chooseAddress = ()=>{
  return new Promise((resolve, reject)=>{
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

/**
 * promise的 wx.openSetting
 */
export const openSetting = ()=>{
  return new Promise((resolve, reject)=>{
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}