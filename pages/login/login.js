// pages/login/index.js
import { login, showToast } from "../../utils/asyncWx";
import {myrequest} from "../../request/myrequest"
var app = getApp();
Page({

  onShow(){
    wx.hideHomeButton();
  },
  async handleGetUserInfo(e){
     const {code}= await login();
     const { encryptedData, rawData, iv, signature } = e.detail;
     let messages ={
       code:code,
       encryptedData:encryptedData,
       rawData:rawData,
       iv:iv,
       signature:signature
     }
     const res=  await myrequest({url:"/user/login",data:messages,method:"post"})
     console.log(res);
     const returnInfo =res.data;
     if(returnInfo.code===0){
       showToast("登录失败，请稍后再试");
     }
     else{
        let userInfo = e.detail.userInfo;
        console.log(userInfo);
        userInfo.wallet=returnInfo.msg.wallet;
        userInfo.userId=returnInfo.msg.userId;
        app.globalData.sessionId=returnInfo.msg.uuid;
        console.log(app.globalData.sessionId);
        wx.setStorageSync('userInfo', userInfo);
        wx.switchTab({
          url: '../index/index',
        })
     }
       
  }
})