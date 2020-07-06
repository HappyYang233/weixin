import { myrequest } from "../../request/myrequest";

// pages/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods:[],
    order:{}
  },
  orderDetail:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let json = options.order;
    let order = JSON.parse(json);
    let orderDetail = order.orderDetail;
    this.orderDetail=orderDetail;
    let foodId=[];
    this.setData({
      order
    })
    orderDetail.forEach(x=>{
      foodId.push(x.foodId);
    })
    this.getFoods(foodId);

  },
  async getFoods(params)
  {
    let {data} = await myrequest({url:"/order/findOrderDetail",data:{params},method:"post"});
    let foods=data.msg;
    foods.forEach(x=>{
      this.orderDetail.forEach(v=>{
        if(x.id==v.foodId)
        {
          x.num=v.num;
        }
      })
    })
    this.setData({
      foods
    }) 
  },
  async handleCancel(){
    let order=this.data.order;
    let id = order.id;
    let totalMoney=order.totalMoney;
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
     success: async (result) => {
        if (result.confirm)
         {
          let {data}=await myrequest({url:"/order/cancel" ,data:{id,totalMoney},method:"post"});
          console.log("hdhashdhashdhashdhasd");
          console.log(data.code);
          if(data.code===9)
          {
            wx.showToast({
              title: '订单取消成功',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: true,
              success: (result) => {
                // 
    
                  
              },
              fail: () => {},
              complete: () => {}
            });
            this.sleep(1500);
            wx.switchTab({
              url: '../order_list/order_list',
              success: (result) => {
                
              },
              fail: () => {},
              complete: () => {}
            });
              
          }
          else
          {
            wx.showToast({
              title: '取消失败',
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
        }
        
      },
      fail: () => {},
      complete: () => {}
    });
  
    
  },
  async cancel(id,totalMoney)
  {
   let {data} = await myrequest({url:"/order/cancel" ,data:{id,totalMoney},method:"post"});
    console.log(data);
        return data;
  },
 sleep(numberMillis) { 
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
    now = new Date(); 
    if (now.getTime() > exitTime) 
    return; 
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
  onShow: function () {

  },

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