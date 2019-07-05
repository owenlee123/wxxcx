function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    percent: 0,
    banner: [],
    poster: 'http://dpic.tiankong.com/ls/iv/QJ9124489234.jpg',
    name: '黑色幽默',
    author: '周杰伦',
    src: 'http://dl.stream.qqmusic.qq.com/M5000006rBfE3htPqG.mp3?vkey=A8FD454585F2A2E9BD63C0F1B5AA0ABA18AF3134432EDF1A2FC52BD26D9ECE2E59A3E6D26B6607E836CDD8A5AF9AD2CD7B61F739F1BA30BF&guid=5150825362&fromtag=1',
    videoSrc: "http://fus.cdn.krcom.cn/0010UudIlx07uAO449qU01041201uFJI0E010.mp4?label=mp4_1080p&template=1920x1080.22.0&Expires=1562244855&ssig=ARo5xHbtR6&KID=unistore,video",
    danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ],
    inp: ""
  },
  videoplay() {
    console.log('开始播放');
    // 没有播放,需要暂停
    if (!wx.getStorageSync('isPlay')) {
      this.videoCtx.pause();
      this.showModal();
    }
  },
  videoplaying() {
    console.log('正在播放');
    // 没有播放,需要暂停
    if (!wx.getStorageSync('isPlay')) {
      this.videoCtx.pause();
      this.showModal();
    }
  },
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  // 获取视频 url
  bindButtonTap() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function(res) {
        that.setData({
          videoSrc: res.tempFilePath
        })
      }
    })
  },
  bindInputBlur(e) {
    this.setData({
      inp: e.detail.value
    })
  },
  bindSendDanmu() {
    this.videoCtx.sendDanmu({
      text: this.data.inp,
      color: getRandomColor()
    });
    this.setData({
      inp: ""
    })
  },
  // 调取弹框
  showModal() {
    var that = this;
    wx.showModal({
      title: '警告',
      content: '你正在使用4G流量观看视频,是否继续',
      cancelText: "取消观看",
      confirmText: "继续观看",
      cancelColor: "#029",
      confirmColor: "#029",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.videoCtx.play();
          wx.setStorageSync('isPlay', true)
          wx.showToast({
            title: '土豪请继续',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
          that.videoCtx.pause();
          wx.showToast({
            title: '你取消观看',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var timer = setInterval(() => {
      if (this.data.percent < 100) {
        this.setData({
          percent: ++this.data.percent
        })
      } else {
        clearInterval(timer);
        this.setData({
          show: false
        });
        wx.showToast({
          title: '加载完成',
        })
      }
    }, 10)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    // 获取当前设备的网络状态
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        console.log(networkType);
        wx.setStorageSync("isPlay", networkType == "wifi")
      }
    })
    // 监听当前的网络状态
    wx.onNetworkStatusChange(function(res) {
      console.log(res.isConnected)
      console.log(res.networkType)
      wx.setStorageSync("isPlay", res.networkType == "wifi")
    })



    this.videoCtx = wx.createVideoContext('myVideo')
    this.audioCtx = wx.createAudioContext('myAudio')
    wx.request({
      url: 'http://47.102.217.191/react/getNews',
      data: {
        limit: 6
      },
      success: res => {
        console.log(res);
        this.setData({
          banner: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})