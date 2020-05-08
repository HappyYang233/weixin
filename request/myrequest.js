// 同时发送异步代码的次数
var app = getApp();
let ajaxTimes=0;
export const myrequest=(params)=>{
  let header={...params.header};
  params.data.sessionId=app.globalData.sessionId;
  if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }
    ajaxTimes++;
    // 显示加载中 效果
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    const baseUrl="http://192.168.0.105:8080";
    return new Promise((resolve,reject)=>{
         wx.request({
            ...params,
            header:header,
            url:baseUrl+params.url,
            success: (result) => {
              //如果会code==10则表示会话过期，这在拦截器里面做判断
              if(result.data.code==10)
              {
                returnLogin();
              }
              else{
                resolve(result);
              }
                
            },
            fail: (err) => {
              console.log(err);
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                  //  关闭正在等待的图标
                  wx.hideLoading();
                }
               }
        });
          
    })
}