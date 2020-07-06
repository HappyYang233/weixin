import{myrequest} from "../../request/myrequest.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
   this.getOrderList();
  },
  async getOrderList(){
    let {data} = await myrequest({url:"/order/findAll",data:{},method:"post"});
    let orderList=data.msg;
    this.setData({
      orderList
    })
  },
 handlefindOrderDetail(e)
 {
    let {index} = e.currentTarget.dataset;
    let order= this.data.orderList[index];
    let jsonString = JSON.stringify(order);
    wx.navigateTo({
      url: '../order_detail/order_detail?order='+jsonString,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      

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