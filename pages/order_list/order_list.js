import{request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    
  },
  async getResList(){
    let num=5;
    let res_list = await request({url:"/goods/search",data:num});
    this.setData({
      res_list:res_list.goods
    })
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