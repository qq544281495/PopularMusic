// app.js
App({
  globalData: {
      screenWidth: 0,
      screenHeight: 0,
      statusHeight: 0,
      playHeight: 0,
  },
  onLaunch(){
      // 获取设备信息
      wx.getSystemInfo({
          success: (response) => {
              this.globalData.screenWidth = response.screenWidth;
              this.globalData.screenHeight = response.screenHeight;
              this.globalData.statusHeight = response.statusBarHeight;
              this.globalData.playHeight = response.screenHeight - response.statusBarHeight - 44;
          }
      });
  }
})
