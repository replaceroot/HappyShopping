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

/**
 * 确认框
 * @param {Object} param0 要传递的参数
 */
export const showModal = ({content})=>{
  return new Promise((resolve, reject)=>{
    wx.showModal({
      title: '提示',
      content: content,
      success (res) {
        resolve(res);
      }
    })
  })
}

/**
 * promise的wx-login
 * 
 */
export const wxLogin = ()=>{
  return new Promise((resolve, reject)=>{
    wx.login({
      timeout:100000000,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
      
  })
}
  
