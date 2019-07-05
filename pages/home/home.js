// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "生无可恋",
    phone: 13798979098,
    src: "http://47.102.217.191/owenvue/img/arcImg4.0345ecf6.jpg",
    flag: false,
    array: [{
      message: 'demo1',
    }, {
      message: 'demo2'
    }, {
      message: 'demo3'
    }],
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    items: ['拍照', '从相册选择', '扫一扫'],
    userData: {
      name: "owenlee",
      age: 28
    },
    likeData: {
      who: "owen",
      count: 999
    },
    actionData: {
      actionHidden: true,
      items: ["出国", "护照", "移民"]
    },
    modalData: {
      modalHidden: true,
      mobile: 13797038776,
      code: ""
    }
  },
  getMobile(e) {
    this.setData({
      "modalData.mobile": e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      "modalData.code": e.detail.value
    })
  },
  loginFail() {
    this.setData({
      "modalData.modalHidden": false
    })
  },
  fetchCode() {
    wx.request({
      url: 'http://47.102.217.191/react/sendCode', //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        mobile: this.data.modalData.mobile
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.showToast({
          title: res.data.msg
        })
      }
    })
  },
  login() {
    wx.request({
      url: 'http://47.102.217.191/react/testCode', //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        mobile: this.data.modalData.mobile,
        code: this.data.modalData.code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data);
        wx.showToast({
          title: res.data.msg
        });
        this.setData({
          "modalData.modalHidden": false
        });

        if (!!res.data.type) {
          wx.setStorageSync("isLogin", true)
        }
      }
    })
  },
  changetab(e) {
    console.log(e);
    var idx = e.target.dataset.idx;
    this.setData({
      "actionData.actionHidden": true
    })

    wx.showToast({
      title: this.data.actionData.items[idx] + "success"
    })

  },
  cancel() {
    this.setData({
      "actionData.actionHidden": true
    })
  },
  openMyAction() {
    this.setData({
      "actionData.actionHidden": false
    })
  },
  openAction() {
    wx.showActionSheet({
      itemList: this.data.items,
      success: res => {
        console.log(res.tapIndex);
        wx.showToast({
          title: this.data.items[res.tapIndex] + '成功',
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  openModal() {
    wx.showModal({
      title: '警告',
      content: '你正在使用4G流量观看视频,是否继续',
      cancelText: "取消观看",
      confirmText: "继续观看",
      cancelColor: "#029",
      confirmColor: "#029",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '土豪请继续',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '你取消观看',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })
  },
  changeFlag(e) {
    console.log(e);
    this.setData({
      flag: e.detail.value
    })
  },
  getSome(e) {
    console.log(e);
    console.log(e.target.dataset.msg);
    console.log(e.touches[0].clientX);
  },
  getValue(e) {
    console.log(e);
    console.log(e.detail.value);
  },
  childOne() {
    console.log("catch 可以阻止事件冒泡");
  },
  childTwo() {
    console.log("bind 不能阻止事件冒泡");
  },
  getParent() {
    console.log("I am Parent");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("isLogin")) {
      this.setData({
        "modalData.modalHidden": false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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