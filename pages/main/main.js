// pages/main/main.js

let avatarBackgroundLastTapTime = 0;

let stickers1 = [
  {
    id : 0,
    url : "../image/tiger/tiger.png",
    name : "虎萌朵朵",
    detail : ""
  },

  {
    id : 1,
    url : "../image/tiger/tiger_head.png",
    name : "虎视眈眈",
    detail : ""
  },

  {
    id : 2,
    url : "../image/tiger/bu_liang_ren.png",
    name : "一天是",
    detail : ""
  },

  {
    id : 3,
    url : "../image/tiger/bing_dundun.png",
    name : "冰墩墩",
    detail : ""
  },

  {
    id : 4,
    url : "../image/tiger/xue_rongrong.png",
    name : "雪融容",
    detail : ""
  },

  {
    id : 5,
    url : "../image/tiger/pai_meng.png",
    name : "派蒙",
    detail : ""
  },

  {
    id : 6,
    url : "../image/tiger/ba_chong_fox.png",
    name : "八重神子",
    detail : ""
  },
]

let stickers2 = [
  {
    id : 0,
    url : "../image/look_star/pisces.png",
    name : "双鱼座",
    detail : ""
  },

  {
    id : 1,
    url : "../image/look_star/taurus.png",
    name : "金牛座",
    detail : ""
  },

  {
    id : 2,
    url : "../image/look_star/cancer.png",
    name : "巨蟹座",
    detail : ""
  },

  {
    id : 3,
    url : "../image/look_star/virgo.png",
    name : "处女座",
    detail : ""
  },

  {
    id : 4,
    url : "../image/look_star/scorpio.png",
    name : "天蝎座",
    detail : ""
  },

  {
    id : 5,
    url : "../image/look_star/capricorn.png",
    name : "摩羯座",
    detail : ""
  },

  {
    id : 6,
    url : "../image/look_star/girl.png",
    name : "Girl",
    detail : ""
  }
]

let stickers3 = [
  {
    id : 0,
    url : "../image/down_earth/aquarius.png",
    name : "水瓶座",
    detail : ""
  },

  {
    id : 1,
    url : "../image/down_earth/aries.png",
    name : "白羊座",
    detail : ""
  },

  {
    id : 2,
    url : "../image/down_earth/gemini.png",
    name : "双子座",
    detail : ""
  },

  {
    id : 3,
    url : "../image/down_earth/leo.png",
    name : "狮子座",
    detail : ""
  },

  {
    id : 4,
    url : "../image/down_earth/libra.png",
    name : "天秤座",
    detail : ""
  },

  {
    id : 5,
    url : "../image/down_earth/sagittarius.png",
    name : "射手座",
    detail : ""
  },

  {
    id : 6,
    url : "../image/down_earth/boy.png",
    name : "Boy",
    detail : ""
  },
]

let stickerImageInfo = {
  stickerSize : 100,
  stickerMarginX : 0,
  stickerMarginY : 0,
  stickerScale : 1,
  stickerRotate : 0
}

// let smallScalle = 0.2;

// let bigScalle = 2.5;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    avatarUrl : "",
    // 是否已经拥有了用户信息
    hasUserInfo : false,
    // 贴纸的 url
    stickerUrl : "",
    hasStickerUrl : false,
    // 贴纸的尺寸
    // stickerImageSize : 100,

    // 贴纸距离左 和 顶部的 marjin
    // stickerImageMarginX : 0,
    // stickerImageMarginY : 0,

    // 贴纸缩放系数
    // stickerImageScale : 1,

    // 贴纸旋转角度
    // stickerImageRotate : 0,

    // 是否可以单指移动
    // canOnePointMove : false,
    // 单指触摸的 x, y 坐标
    // onePoint : {
    //   x : 0,
    //   y : 0
    // },

    // twoPoint : {
    //   x1 : 0,
    //   y1 : 0,
    //   x2 : 0,
    //   y2 : 0
    // },

    // 头像背景的范围
    // viewAvatarRange : {
    //   left : 0,
    //   top : 0,
    //   right : 0,
    //   bottom : 0
    // },

    // 贴纸数组
    stickerImageList : stickers1,

    // 贴纸 scroll-view 顶部索引
    scrollViewTopNum : 0, 

    // 关于悬浮按钮的起始坐标点
    movableViewAboutX : 0,
    movableViewAboutY : 0,

    // 贴纸 menu 

    stickerMenuList : [
      {
        id : 0,
        name : "虎萌虎威",
        isActive : true
      },

      {
        id : 1,
        name : "仰望星空",
        isActive : false
      },

      {
        id : 2,
        name : "脚踏实地",
        isActive : false
      }
    ],

    // 是否可以请求刷新
    canRefresh : false,
    // 通知 wxs 重置信息
    isReset : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // 隐藏导航栏左侧的 home 按钮
    wx.hideHomeButton();
    var that = this;

    // wx.createSelectorQuery().select('#v_avatarBackground').boundingClientRect(function(res) {
    //   // console.log("rect-->", res)
    //   that.setData({
    //     ['viewAvatarRange.left'] : res.left,
    //     ['viewAvatarRange.right'] : res.right,
    //     ['viewAvatarRange.top'] : res.top,
    //     ['viewAvatarRange.bottom'] : res.bottom
    //   })
    // }).exec();

    wx.getSystemInfo({
      success: (result) => {
        // console.log("result-->", result);
        let dpr = wx.getSystemInfoSync().pixelRatio;
        
        let x = result.windowWidth - 16 * dpr;
        let y = result.windowHeight - 16 * dpr;

        this.setData({
          movableViewAboutX : x,
          movableViewAboutY : y, 
        })
      },
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

  },

  // 头像背景处，点击事件，获取头像的请求，只支持 tap 事件
  // 这里要加个去抖操作，防止快速点击时，相应多次

  avatarBackgroundTap: function(e) {
    // 获取点击时间
    let time = new Date().getTime();
    if(time - avatarBackgroundLastTapTime <= 2000) {
      return;
    }
    avatarBackgroundLastTapTime = time;

    if (!this.data.hasUserInfo) {
      this.getUserProfile(e);
    }
  },
  
  // 获取用户头像信息
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      desc: '展示用户信息',
      success: (res) =>{
        // log 输出时，如果想显示对象的 string 格式内容，用 “,” 代替 “+”
        // console.log("getUserProfile:", res.userInfo);
        
        let userInfo = res.userInfo;

        if(userInfo == null) {
          wx.showToast({
            title: '获取微信信息失败，请重新授权',
          })
        }

        if (userInfo.avatarUrl != null) {
          let index = userInfo.avatarUrl.lastIndexOf('/');
          if (index > 0) {
            let higtAvatatUrl = userInfo.avatarUrl.substring(0, index) + '/0';

            this.setData({
              avatarUrl : higtAvatatUrl,
              hasUserInfo : true
            })
          }
        }
      },

      fail: (res) => {
        console.log("failure:", res);
      }
    })
  },

  // 头像背景处的触摸开始事件
  // avatarBackgroundTouchStart: function(event) {
  //     // console.log("touchStart-->", event);
  //     let that = this;
  //     // 单指触摸
  //     if (event.touches.length == 1 ) {

  //       // 判断触摸点是否在贴纸框内
  //       // 触摸信息中，包含触摸点触发的 view 信息，可以判断是否是贴纸控件触发的
  //       if (event.target.id == "iv_sticker") {
  //         that.setData({
  //           canOnePointMove : true,
  //           ['onePoint.x'] : event.touches[0].pageX,
  //           ['onePoint.y'] : event.touches[0].pageY
  //         })
  //       }
  //     } else {
  //       // 多指触控
  //       that.setData({
  //         ['twoPoint.x1'] : event.touches[0].pageX,
  //         ['twoPoint.y1'] : event.touches[0].pageY,
  //         ['twoPoint.x2'] : event.touches[1].pageX,
  //         ['twoPoint.y2'] : event.touches[1].pageY
  //       })
  //     }
  // },

  // 头像背景处的触摸移动事件
  // avatarBackgroundTouchMove: function(event) {
  //   let that = this;
    
  //   if (event.touches.length == 1 && this.data.canOnePointMove) {
  //     let onePointDiffX = (event.touches[0].pageX - that.data.onePoint.x) / 2;
  //     let onePointDiffY = (event.touches[0].pageY - that.data.onePoint.y) / 2;

  //     // 进行边界处理判断，贴纸位置不能移除头像外
  //     // 真机会有卡顿，考虑是否做到触摸结束后，添加一个回退动画，限制其范围。
  //     let marginX = that.data.stickerImageMarginX + onePointDiffX;
  //     let marginY = that.data.stickerImageMarginY + onePointDiffY;

  //     let fixImageSize = that.data.stickerImageSize * that.data.stickerImageScale;
  //     let fixMarginX = marginX - (fixImageSize - that.data.stickerImageSize) / 2;

  //     let fixMarginY = marginY - (fixImageSize - that.data.stickerImageSize) / 2;

  //     let booleanX = ((fixMarginX + that.data.viewAvatarRange.left) > (that.data.viewAvatarRange.right - fixImageSize / 2)
  //     || (fixMarginX + that.data.viewAvatarRange.left) < (that.data.viewAvatarRange.left - fixImageSize / 2));

  //     let booleanY = ((fixMarginY + that.data.viewAvatarRange.top) > (that.data.viewAvatarRange.bottom - fixImageSize / 2)
  //     || (fixMarginY + that.data.viewAvatarRange.top) < (that.data.viewAvatarRange.top - fixImageSize / 2));

  //     if (!booleanX) {
  //       that.setData({
  //         stickerImageMarginX : marginX,
  
  //         ['onePoint.x'] : event.touches[0].pageX
  //       })
  //     }

  //     if (!booleanY) {
  //       that.setData({
  //         stickerImageMarginY : marginY,

  //         ['onePoint.y'] : event.touches[0].pageY
  //       })
  //     }
  //   } else if(event.touches.length >= 2){// 加个判断，否则移动时，报错找不到 pageX
  //     let preTwoPoint = JSON.parse(JSON.stringify(that.data.twoPoint));
      
  //     that.setData({
  //       ['twoPoint.x1'] : event.touches[0].pageX,
  //       ['twoPoint.y1'] : event.touches[0].pageY,
  //       ['twoPoint.x2'] : event.touches[1].pageX,
  //       ['twoPoint.y2'] : event.touches[1].pageY
  //     })

  //     // 计算角度，旋转优先
  //     // tan(x) = 对边 / 邻边
  //     let perAngle = Math.atan((preTwoPoint.y1 - preTwoPoint.y2) / (preTwoPoint.x1 - preTwoPoint.x2)) * 180 / Math.PI;

  //     let curAngle = Math.atan((that.data.twoPoint.y1 - that.data.twoPoint.y2) / (that.data.twoPoint.x1 - that.data.twoPoint.x2)) * 180 / Math.PI;

  //     if (Math.abs(perAngle - curAngle) > 0) {
  //       that.setData({
  //         stickerImageRotate : that.data.stickerImageRotate + (curAngle - perAngle)
  //       })
  //     }

  //     // 计算距离，缩放
  //     let preDistance = Math.sqrt(Math.pow((preTwoPoint.x1 - preTwoPoint.x2), 2) + Math.pow((preTwoPoint.y1 - preTwoPoint.y2), 2));

  //     let curDistance = Math.sqrt(Math.pow((this.data.twoPoint.x1 - this.data.twoPoint.x2), 2) + Math.pow((this.data.twoPoint.y1 - this.data.twoPoint.y2), 2));

  //     if (Math.abs(curDistance - preDistance) > 0) {

  //       // 进行一个缩放尺寸的限制
  //       let scale = that.data.stickerImageScale + (curDistance - preDistance) * 0.005;
  //       if (scale < smallScalle || scale >= bigScalle) {
  //         return;
  //       }
  //       that.setData({
  //         stickerImageScale : scale
  //       })
  //     }
  //   }
  // },

  // 头像背景处的触摸结束事件
  // avatarBackgroundTouchEnd: function(event) {
  //   this.setData({
  //     canOnePointMove : false
  //   })
  //   // console.log("end-->", event);
  // },

  /** ---- */
  
  // 保存按钮
  saveViewClick: function(event) {
    // 进行一个判断，如果没有头像，提示用户获取头像，
    // 没有头像请先选择头像
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '请先点击(+)获取图像',
        icon:'none'
      })
      return;
    }

    // 没有贴纸请先选择贴纸
    if (!this.data.hasStickerUrl) {
      wx.showToast({
        title: '请选择贴纸',
        icon:'none'
      })
      return;
    }
    // 先申请相册权限，会有问题，只能先绘制
    this.canvasDraw();
  },

  // 绘制头像
  canvasDraw() {
    wx.showToast({
      title: '正在生成图片',
      icon: 'loading',
      duration: 10000
    })

    var that = this;

    // 这里获取贴纸的位置信息等
    wx.createSelectorQuery().select('#iv_sticker').fields({
      node : true, 
      size : true,
      rect : true,
      properties : ["scale"]
    }).exec((res) => {
      console.log("sticker-->", res);
    })

    wx.createSelectorQuery().select('#canvas_draw').fields({node : true, size : true}).exec((res) => {
      
      // console.log("canvas-->", res);

      const canvasWidth = res[0].width;
      const canvasHeight = res[0].height;

      // 如果 wxml 中去掉 type="2d" 属性，则 node 节点就为 null 了
      // const canvas = res[0].node;
      // const ctx = canvas.getContext('2d');

      // 默认画布尺寸为 300 * 150，进行缩放或者赋值
      // canvas.width = canvasWidth;
      // canvas.height = canvasHeight;

      // console.log("canvas w h-->", canvas.width + ", " + canvas.height);

      const ctx = wx.createCanvasContext('canvas_id', this);
      
      wx.getImageInfo({
        src: that.data.avatarUrl,
        success(res) {
          // console.log("image info-->", res);

          // 不知道为什么，这样写 image 无法加载临时路径
          // 临时路径格式为 http://tmp/xxx  ,应该是解密不了
          // const imgAvatar = canvas.createImage();
          // imgAvatar.src = res.path;
          // imgAvatar.width = canvas.width;
          // imgAvatar.height = canvas.height;
          // // 方法名要写对，load 的 l 要小写
          // imgAvatar.onload = function() {
          //   // 绘制头像
          //   ctx.drawImage(imgAvatar, 0, 0, canvas.width, canvas.height);
            
          //   // 保存头像
          //   that.canvasSave(canvas.width, canvas.height, canvasWidth, canvasHeight, canvas);
          // }
          // 绘制头像
          ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight);
          
          // 绘制贴纸
           ctx.save();
           ctx.beginPath();

          // 平移距离 贴纸移动了多少距离
          ctx.translate( stickerImageInfo['stickerMarginX'], stickerImageInfo['stickerMarginY']);
          
          // 旋转
          // 先平移到贴纸的中心
          ctx.translate(stickerImageInfo['stickerSize'] / 2, stickerImageInfo['stickerSize'] / 2);
          // 以贴纸中心为圆心，旋转
          ctx.rotate(stickerImageInfo['stickerRotate'] * Math.PI / 180)
          // 移回之前的坐标轴原点
          ctx.translate(-stickerImageInfo['stickerMarginX'] - stickerImageInfo['stickerSize'] / 2, -stickerImageInfo['stickerMarginY'] - stickerImageInfo['stickerSize'] / 2);
          
          // 缩放
          // 因为是以贴纸中心为原点缩放，要修改左侧起始位置和上侧起始位置
          ctx.drawImage(that.data.stickerUrl, stickerImageInfo['stickerMarginX'] - (stickerImageInfo['stickerSize'] * stickerImageInfo['stickerScale'] - stickerImageInfo['stickerSize']) / 2, stickerImageInfo['stickerMarginY'] - (stickerImageInfo['stickerSize'] * stickerImageInfo['stickerScale'] - stickerImageInfo['stickerSize']) / 2, stickerImageInfo['stickerSize'] * stickerImageInfo['stickerScale'], stickerImageInfo['stickerSize'] * stickerImageInfo['stickerScale']);

          ctx.closePath();
          ctx.restore();
          ctx.draw();
          
          wx.hideToast();
          // 保存到本地
          that.applyPhotoAlbumPermission();
        }
      })
      
    })
  },

  canvasSave(canvasWidth, canvasHeight, imageWidth, imageHeight, mCanvas) {

    wx.canvasToTempFilePath({
      // 指定的画布区域的左上角横坐标
      x : 0,
      y : 0,
      // 指定的画布区域的宽度
      width : canvasWidth,
      height : canvasHeight,
      // 输出的图片的宽度
      destWidth : imageWidth,
      destHeight : imageHeight,
      canvas : mCanvas,
      fileType : "png",
      success : function(res) {
        console.log("canva to temp-->", res);

        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log("sava photo success-->", res);
            wx.showToast({
              title: '保存成功',
            })
          },
          fail(res) {
            console.log("save photo fail-->", res);
            wx.showToast({
              title: '保存失败',
            })
          }
        })
      },
      fail : function(res) {
        console.log("canvas to temp fail-->", res);
      },

      complete : function(res) {
        console.log("canvas to temp complete-->", res);
      }
    }, this);
  },

  canvasSave2(){
    var that = this;
    // 添加一个 dialog 提示正在保存
    wx.showToast({
      title: '正在保存图片',
      icon: 'loading',
      duration: 10000
    })
    wx.canvasToTempFilePath({
      canvasId : "canvas_id",
      fileType : "png",

      success : function(res) {
        console.log("canvas to temp-->", res);

        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon : 'none'
            })
          },
          fail(res) {
            wx.showToast({
              title: '保存失败',
              icon : 'none'
            })
          }
        })
      },
      fail: function(res) {
        console.log("save fail-->", res);
      }, 
      complete: function() {
        wx.hideToast({})
        that.setData({
          canRefresh : true
        })
      }

    }, this)
  },

  // 申请相册权限
  applyPhotoAlbumPermission() {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log("authorize success-->");
              that.canvasSave2();
            }
          });
        } else {
          that.canvasSave2();
        }
      }
    })
  },

  // 关于按钮的点击事件
  aboutViewTap : function(e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  // 虎萌虎威点击事件
  stickerMenuTap : function(e) {
    let id = e.currentTarget.dataset.id;
    
    let menuList = this.data.stickerMenuList;
    for(let i = 0; i < menuList.length; i++) {
      menuList[i].isActive = false;
      if(id === menuList[i].id) {
        menuList[i].isActive = true;
      }
    }
    if (id === 0) {
      this.setData({
        stickerImageList : stickers1
      })
    } else if (id === 1) {
      this.setData({
        stickerImageList : stickers2
      })
    } else {
      this.setData({
        stickerImageList : stickers3
      })
    }
    this.setData({
      stickerMenuList : menuList,
      scrollViewTopNum : 0
    })
  },

  // 滑动列表的 item 点击事件
  stickerImageItemTap : function(e) {
    let url = e.currentTarget.dataset.url;
    this.setData({
      // 告诉 wxs 文件重置
      isReset : true,
      // 贴纸信息
      stickerUrl : url,
      hasStickerUrl : true,
      
      // 重置贴纸各种信息
      // stickerImageSize : 100,
      // stickerImageMarginX : 0,
      // stickerImageMarginY : 0,
      // stickerImageScale : 1,
      // stickerImageRotate : 0
    })
  },

  // 刷新按钮点击事件
  refreshViewClick : function(e) {
    // 重置所有信息
    this.setData({
     // 用户信息
      avatarUrl : "",
      // 是否已经拥有了用户信息
      hasUserInfo : false,
      // 是否可以请求刷新
      canRefresh : false,
      // 贴纸的 url
      stickerUrl : "",
      hasStickerUrl : false,
      isReset: true
      // 贴纸的尺寸
      // stickerImageSize : 100,
      // 贴纸距离左 和 顶部的 marjin
      // stickerImageMarginX : 0,
      // stickerImageMarginY : 0,
      // 贴纸缩放系数
      // stickerImageScale : 1,
      // 贴纸旋转角度
      // stickerImageRotate : 0,
    });

    wx.createSelectorQuery().select('#canvas_draw').fields({node : true, size : true}).exec((res) => {
      const canvasWidth = res[0].width;
      const canvasHeight = res[0].height;
      const ctx = wx.createCanvasContext('canvas_id', this);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.draw();
    })
  },

  // wxs 回调回来的 stick info
  onStickerInfoChange : function(obj) {
    // console.log("callback", obj);
    stickerImageInfo = obj;
  }
})