// pages/user/index.js
Page({
  data: {
    userinfo:{},
  
    collectNums:0
  },
  onShow(){
    const userinfo=wx.getStorageSync("userInfo");
    // const collect=wx.getStorageSync("collect")||[];
    
    this.setData({
      userinfo:userinfo
    });
      
  },
  handleExit(e){
    wx.showModal({
      title: '提示',
      content: '确认是否退出登录',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.reLaunch({
            url: '../login/login',
            success: (result) => {
              let app =  getApp();
              app.globalData.sessionId=null;
              wx.clearStorageSync();                
            },
            fail: () => {},
            complete: () => {}
          });
            
        }
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  handleAddMoney(e){
    
  }

})