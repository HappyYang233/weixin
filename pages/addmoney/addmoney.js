//index.js

import { myrequest } from "../../request/myrequest";
import { reLoginModal } from "../../utils/asyncWx";

//获取应用实例
const app = getApp()

Page({
  data: {
    money:''
  },
  onLoad:function(option)
  {

  },

  handleInput(e){
    let money = e.detail.value;
    this.setData({
      money
    });
  },
 async handleAdd(e){
  let money =this.data.money; 
  if(money=='')
   {
     wx.showToast({
       title: '请输入金额',
       icon: 'none',
       image: '',
       duration: 1500,
       mask: false,
       success: (result) => {
         
       },
       fail: () => {},
       complete: () => {}
     });
       
   }
   
  //  else if(!this.isNumber(money)){
  //     wx.showToast({
  //       title: '请输入数字',
  //       icon: 'none',
  //       image: '',
  //       duration: 1500,
  //       mask: false,
  //       success: (result) => {
          
  //       },
  //       fail: () => {},
  //       complete: () => {}
  //     });
        
  //  }
   else{
     console.log(this.data.money);
     
     console.log("100");
     console.log(100);
     console.log(money);
      let {data}=  await myrequest({url:"/user/addmoney",data:{money},method:"post"});
      if(data.code==20)
      {
       reLoginModal();
          
      }
      else if(data.code==0)
      {
        wx.showToast({
          title: '充值失败',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
      }
      else{
        wx.showToast({
          title: '充值成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            let userinfo = wx.getStorageSync("userInfo");
            userinfo.wallet=userinfo.wallet+parseFloat(money);
            wx.setStorageSync("userInfo",userinfo);
              
          },
          fail: () => {},
          complete: () => {}
        });
          
      }


   }
    
      
  },
  isNumber(num){
    var regPos = / ^\d+$/; // 非负整数
    var regNeg = /^\-[1-9][0-9]*$/; // 负整数
    if(regPos.test(num) || regNeg.test(num)){
        return true;
    }else{
        return false;
    }
}
})
