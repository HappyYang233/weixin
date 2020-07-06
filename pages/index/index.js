import { login, showToast ,showModal,reLoginModal} from "../../utils/asyncWx";
import {myrequest} from "../../request/myrequest"
import {returnLogin} from "../../utils/returnLogin"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res_list:[],
    res_car_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(){
   
  },
  onShow: function () {
    this.getResList();
  },
  
  // 获取食堂列表
  async getResList(){
    let res = await myrequest({url:"/res/showAll",method:"post",data:{}});
    const returnData = res.data;
    console.log(res);
    if(returnData.code===10)
    {
      returnLogin();
    }
    // else if(returnData.code===20)
    // {
    //   showModal("0-10点和1-4允许下单，其他时间段不提供服务");
    // }
    if(returnData.code===0)
    {
        wx.showModal({
          title: '提示',
          content: '请求失败，是否重新请求',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if (result.confirm) {
              getResList();
            }
          },
          fail: () => {},
          complete: () => {}
        });
    }
    //将食堂信息存入缓存
    wx.setStorageSync("res_list", returnData.msg);
      this.setData({
        res_list:returnData.msg
      })
    
    

    
  },

  handlerShowMenu(e){
    console.log("handlerShowMenu+log"+e);
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    this.showMenu(id,name);
  },
  async showMenu(id,name){
    const {data} = await myrequest({url:"/food/showMenu",data:{"resId":id},method:"post"})
    //提示不允许下单
    if(data.code===20)
     {
       wx.showModal({
         title: '提示',
         content: '"0-10点和13-16允许下单，其他时间段不提供服务"',
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
     //请求成功
    else if(data.code===1)
      {
        if(id!=this.data.res_car_id)
        {
          this.setData({
            res_car_id:id
          })
          wx.removeStorageSync("buyCar");
        }
        wx.setStorageSync("resName",name);
        let menu = data.msg;
        wx.setStorageSync("menu", menu);       
        wx.navigateTo({
          url: '../res_detail/res_detail',
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
      }
      else{
        wx.showToast({
          title: '获取菜单列表失败，请重试',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true,
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