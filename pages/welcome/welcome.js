// pages/welcome/welcome.js

// let timer = null;
let offsetY = 8;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animateShouldStop: false
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
    let that = this;
    setTimeout(function() {
      that.canvasDraw();
    }, 100);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 延时两秒跳转到主页
    // setTimeout(function() {
    //   // 修改跳转方式，否则导航栏左侧会有返回按钮
    //   wx.redirectTo({
    //     url: '/pages/main/main',
    //   })
    // }, 2000);

 
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

  /**
   * 绘制动态文字
   */
  canvasDraw() {
    let that = this;
    const query = wx.createSelectorQuery();
    // id 要加 # 号前缀
    query.select('#canvasId')
    .fields({node : true, size : true})
    .exec((res) => {
      // console.log("res-->", res);
      const canvasWidth = res[0].width;
      const canvasHeight = res[0].height;
      
      const canvas = res[0].node;
      
      const ctx = canvas.getContext('2d');
 
      let dpr = wx.getSystemInfoSync().pixelRatio;

      canvas.width = canvasWidth * dpr
      canvas.height = canvasHeight * dpr
      ctx.scale(dpr, dpr)

      ctx.font = "24px sans-serif";
      ctx.fillStyle = "#000";

      let txtWidth = ctx.measureText("我们点缀的，不只是你的头像").width;
      var baseX = (canvasWidth - txtWidth) / 2;
      var baseY = canvasHeight / 2;

      let textBean0 = new MyTextBean("我", baseX, baseY);
      let textBean1 = new MyTextBean("们", textBean0.getX() + ctx.measureText(textBean0.getText()).width, baseY);
			let textBean2 = new MyTextBean("点", textBean1.getX() + ctx.measureText(textBean1.getText()).width, baseY);
			let textBean3 = new MyTextBean("缀", textBean2.getX() + ctx.measureText(textBean2.getText()).width, baseY);
			let textBean4 = new MyTextBean("的", textBean3.getX() + ctx.measureText(textBean3.getText()).width, baseY);
			let textBean5 = new MyTextBean("，", textBean4.getX() + ctx.measureText(textBean4.getText()).width, baseY);
			let textBean6 = new MyTextBean("不", textBean5.getX() + ctx.measureText(textBean5.getText()).width, baseY);
			let textBean7 = new MyTextBean("只", textBean6.getX() + ctx.measureText(textBean6.getText()).width, baseY);
			let textBean8 = new MyTextBean("是", textBean7.getX() + ctx.measureText(textBean7.getText()).width, baseY);
			let textBean9 = new MyTextBean("你", textBean8.getX() + ctx.measureText(textBean8.getText()).width, baseY);
			let textBean10 = new MyTextBean("的", textBean9.getX() + ctx.measureText(textBean9.getText()).width, baseY);
			let textBean11 = new MyTextBean("头", textBean10.getX() + ctx.measureText(textBean10.getText()).width, baseY);
			let textBean12 = new MyTextBean("像", textBean11.getX() + ctx.measureText(textBean11.getText()).width, baseY);
			
      let textBeans = [textBean0, textBean1, textBean2, textBean3, textBean4, textBean5, textBean6, textBean7, textBean8, textBean9, textBean10, textBean11, textBean12];
      
     // todo 更换动画调用方法
     // 不再使用 setInterval 方式，而是 requestAnimationFrame 函数
    //  timer = setInterval(() => {
    //     this.textAnimate(ctx, canvasWidth, canvasHeight, textBeans);
    //   }, 1000 / 60)
      const animateLoop = () => {
        this.textAnimate(ctx, canvasWidth, canvasHeight, textBeans);
        let animateId = canvas.requestAnimationFrame(animateLoop);
        if (that.data.animateShouldStop) {
          // 是否有更优雅的取消动画的方式
          canvas.cancelAnimationFrame(animateId);
          console.log("end-->", new Date().toLocaleTimeString());
          setTimeout(function() {
            // 跳转到主界面
            wx.redirectTo({
              url: '/pages/main/main',
            })
          }, 200);
        }
      }

      console.log("begin-->", new Date().toLocaleTimeString());
      canvas.requestAnimationFrame(animateLoop);
    });
  },

  textAnimate(ctx, width, height, textBeans) {
    let that = this;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for(let i = 0; i < textBeans.length; i++) {
					
      if(textBeans[i].getSinStep() <= Math.PI * 2) {
      
        if(i - 1 >= 0) {
          if(textBeans[i - 1].getSinStep() >= 0.25 * Math.PI) {
            ctx.fillText(textBeans[i].getText(), textBeans[i].getX(), -textBeans[i].getSinStepResult() * offsetY + textBeans[i].getY());
          }
        } else {
          ctx.fillText(textBeans[i].getText(), textBeans[i].getX(), -textBeans[i].getSinStepResult() * offsetY + textBeans[i].getY());
        }
        
      } else {
        ctx.fillText(textBeans[i].getText(), textBeans[i].getX(), textBeans[i].getY());
      }
    }

    // ctx.draw();

    // 报错找不到该方法，原因是这个方法是 canvas 类的
    //  var id = requestAnimationFrame(textAnimate);

    if (textBeans[textBeans.length - 1].getSinStep() >= Math.PI * 2) {
      
      // 停止动画
      //clearInterval(timer);
      that.setData({
        animateShouldStop : true
      })
    }
    
  }

})

class MyTextBean {
			
  text = "";
  x = 0;
  y = 0;
  
  sinStep = 0;
  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
  }
  
  getText() {
    return this.text;
  }
  
  setText(text) {
    this.text = text;
  }
  
  getX() {
    return this.x;
  }
  
  setX(x) {
    this.x = x;
  }
  
  getY() {
    return this.y;
  }
  
  setY(y) {
    this.y = y;
  }
  
  // 获取 sin 函数的步长
  getSinStepResult() {
    let step = Math.sin(this.sinStep);
    this.sinStep += 0.025 * Math.PI;
    return step;
  }
  
  getSinStep() {
    return this.sinStep;
  }

}

