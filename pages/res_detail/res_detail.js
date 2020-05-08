// pages/res_detail/res_detail.js
import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    allRightContent:[],
    name:null,
    totalPrice:0,
  },
  allRightContent:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //判断是否已存在购物车
      let buyCar = wx.getStorageSync("buyCar")||[];
      console.log(buyCar);
      let totalPrice=0;
      if(buyCar!=[])
      {
          buyCar.forEach(x=>{
          totalPrice+=x.num*x.price;
        });
        console.log(totalPrice);
      }
      let name=wx.getStorageSync("resName");
      console.log(name);
      let menu = wx.getStorageSync("menu");
      let leftMenuList= menu.cates;
      let rightContent= menu.foods;
      this.allRightContent=menu.foods;
      if(leftMenuList[0])
      {
         var leftId=leftMenuList[0].id;
          var newArray= rightContent.filter(x=>{
            return x.cateId===leftId
          });
          console.log(newArray);
          this.setData({
            leftMenuList:leftMenuList,
            rightContent:newArray,
            totalPrice:totalPrice
          })
      }
      this.setData({
        name
      })
  },
  handleClickCate(e){
    console.log(e);
    let {id} =e.currentTarget.dataset;
    let rightContent=this.allRightContent;
    var newArray= rightContent.filter(x=>x.cateId===id)
    console.log(newArray);

    this.setData({
      rightContent:newArray
    });
  

  },
 async handlePay(e){
    let buyCar = wx.getStorageSync("buyCar")||[];
    if(buyCar.length==0)
    {
      await showToast({title:"您还没有选购商品"});
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  },
  handleShowCar(e){
    
    wx.navigateTo({
      url:'/pages/buycar/buycar'
    })
  },
  handleAdd(e){
    let buyCar = wx.getStorageSync("buyCar")||[];
    let {id} =e.currentTarget.dataset;
    console.log(id);
    let index = buyCar.findIndex(x=>x.id===id);
    let foodArray= this.allRightContent.filter(x=>{
     return x.id===id;
    });
    console.log(foodArray);
    let food = foodArray[0];
    console.log(food);
    if(index===-1)
    {
      food.num=1;
      buyCar.push(food);
    }
    else
    {
      buyCar[index].num+=1;
    }
    wx.setStorageSync("buyCar",buyCar);
    let totalPrice=0
    buyCar.forEach(v=>{
      totalPrice+=v.price*v.num;
    });
    this.setData({
      totalPrice,
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
  onShow: function () {
    let buyCar = wx.getStorageSync("buyCar")||[];
    let totalPrice=0
    if(buyCar!=[])
    {
      buyCar.forEach(v=>{
        totalPrice+=v.price*v.num;
      });
    }
    this.setData({
      totalPrice,
    })
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


    // var  rightContent=[
    //     {"src":"../../image/huiguo.jpg",
    //       "name":"回锅肉",
    //       "dec":"正宗回锅肉",
    //       "num":"2",
    //       "price":"8"
    //     },
    //     {"src":"../../image/rousixiao.png",
    //     "name":"青椒肉丝",
    //     "dec":"巴适",
    //     "num":"5",
    //     "price":"10"
    //     },
    //     {"src":"../../image/luroufanxiao.png",
    //   "name":"卤肉饭",
    //   "dec":"真材实料",
    //   "num":"8",
    //   "price":"15"
    //  },
    //   {"src":"../../image/chaofanxiao.png",
    // "name":"蛋炒饭",
    // "dec":"",
    // "num":"12",
    // "price":"5"
    //  }
    //   ];
    //   wx.setStorageSync("info",rightContent);
    //   var address =[
    //     {"addressId":1,
    //       "resId":1,
    //       "addressInfo":"尚美苑后门"
    //     },
    //     {"addressId":2,
    //       "resId":1,
    //       "addressInfo":"尚美苑前门"
    //     },
    //     { "addressId":3,
    //        "resId":1,
    //      "addressInfo":"七教东门门口"       
    //     }
    //   ]
    //   wx.setStorageSync("address",address);
    //   this.setData({
    //     rightContent:rightContent
    //   })