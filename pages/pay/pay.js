// pages/pay/pay.js
import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";
import {myrequest} from "../../request/myrequest"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:[],
      cart:[],
      userInfo:{
        userMobile:"",
        userName:""
      },
      totalPrice:null,
      hiddenmodalput:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
      var cart = wx.getStorageSync("buyCar")||[];
      var resId=cart[0].resId;
      var totalPrice=0;
      cart.forEach(x=>{
        totalPrice+=x.num*x.price;
      });
      this.getAddress(resId);
      this.setData({
        cart:cart,
        totalPrice:totalPrice
      });
  },
async getAddress(resId){
    let  {data} = await myrequest({url:"/order/getAddress",data:{resId:resId},method:"post"});
    let address = data.msg||[];
    if(address==[]){
      //不做处理
    }
    else
    {
      address.forEach((x,index)=>{
        if(index===(address.length-1))
        {
          address[index].checked=true;
          
        }
        else
        {
          address[index].checked=false;
        }
      });
    }
    console.log(address);
    this.setData({
      address:address
    })
  },
  listenerRadioGroup(e){
    let curAddress= e.detail.value;
    let list = this.data.address;
    list.forEach(x=>{
      if(x.addressInfo==curAddress)
      {
        x.checked=true;
      }
      else
      {
        x.checked=false;
      }
    });
    this.setData({
      address:list
    })
  },

  confirm(){
    this.setData({
      hiddenmodalput:true
    });
  },
  cancel(){
    let pro1 = 'userInfo.userMobile';
    let pro = 'userInfo.userName'
    this.setData({
      [pro1]:"",
      [pro]:"",
      hiddenmodalput:true
    });
  },
  handlerChangeInfo(){
    this.setData({
      hiddenmodalput:false
    });
  },
  handleInputMobile(e){
  let pro = 'userInfo.userMobile'
   this.setData({
     [pro]:e.detail.value
   })
  },
  handleInputName(e){
    let pro = 'userInfo.userName'
   this.setData({
     [pro]:e.detail.value
   })
  },
async  handlePay(){
    let userInfo= this.data.userInfo;
    if(userInfo.userMobile && userInfo.userName )
    {
      console.log("进入支付");
      if(this.data.address==[])
      {
        wx.showToast({
          title: '食堂无取货地址，无法下单',
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
        else
        {
              let indexChecked = this.data.address.findIndex(x=>
              {
                return x.checked===true;
              })
              let address = this.data.address[indexChecked];
              let userInfo=this.data.userInfo;
              let buyCar = this.data.cart;
              let totalPrice=this.data.totalPrice;
              let resId=this.data.cart[0].resId;
              let orderParams={address,userInfo,buyCar,totalPrice,resId};
              let {data} = await myrequest({url:"/order/pay",
                                            data:orderParams,
                                            method:"post"});
              console.log(data.code);
              if(data.code===20)
              {
                wx.showModal({
                  title: '提示',
                  content: '0-10点和13-16允许下单，其他时间段不提供服务',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: (result) => {
                    if (result.confirm) {
                      
                    }
                  },
                  fail: () => {},
                  complete: () => {}
                });
              }
              else if(data.code===30)
              {
                wx.showModal({
                  title: '提示',
                  content: data.msg,
                  showCancel: true,
                  cancelText: '取消',
                  cancelColor: '#000000',
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: (result) => {
                    if (result.confirm) {
                      
                    }
                  },
                  fail: () => {},
                  complete: () => {}
                });
                  
              }
              else if(data.code===1){
                // wx.showModal({
                //   title: '提示',
                //   content: '下单成功，即将跳回主页',
                //   showCancel: false,
                //   confirmText: '确定',
                //   confirmColor: '#3CC51F',
                //   success: (result) => {
                //     if (result.confirm) {
                      
                //     }
                //   },
                //   fail: () => {},
                //   complete: () => {}
                // });
                wx.removeStorageSync("buyCar");
                wx.navigateTo({
                  url: '../success/success',
                });
                //  wx.switchTab({
                //    url: '../index/index',
                //    success: (result) => {
                    
                //    },
                //    fail: () => {},
                //    complete: () => {}
                //  });
                   
               }
               else{
                wx.showModal({
                  title: '提示',
                  content: '"下单失败"',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: (result) => {
                    if (result.confirm) {
                      
                    }
                  },
                  fail: () => {},
                  complete: () => {}
                });
               }

        }
    }
    else{
      wx.showToast({
        title: '请输入完整的取件人信息',
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

// var copy = [
//   {
//     "src":"../../image/jituifanxiao.png",
//     "name":"鸡腿饭",
//     "dec":"正宗大鸡腿",
//     "num":1,
//     "price":8
//   },
//   {
//     "src":"../../image/huangmengjixiao.png",
//     "name":"黄焖鸡米饭",
//     "dec":"精选上等鸡肉",
//     "num":1,
//     "price":8
//   }
//   ];