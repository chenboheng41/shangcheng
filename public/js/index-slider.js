/*周期性定时器*/
$(function(){
  var slideBox=$("#slider");
  var onewidth=$("ul li").eq(0).width();
  var number=slideBox.find(".ec-slider-nav-1 span");
  var timer=null;
  var sw=0;
  var ul=$(".index-slider-middle ul");
  // 每个span绑定click事件,完成切换颜色和动画,以及读取参数值
  number.on("click",function(){
    $(this).addClass("current").siblings("span").removeClass("current");
    sw=$(this).index();
    ul.animate({//点击spanul向右移动
      "right":onewidth*sw
    });
  });
  // 左右按钮控制效果
  $(".next").stop(true,true).click(function(){
    sw++;
    if(sw==number.length){sw=0};
    number.eq(sw).trigger("click");
  });
  $(".prev").stop(true,true).click(function(){
    sw--;
    if(sw==number.length){sw=0};
    number.eq(sw).trigger("click");
  });
// 定时器的使用,自动开始
  var timer = setInterval(function () {
    sw++;
    if (sw == number.length) { sw=0 };
    number.eq(sw).trigger("click");
  },2000);
  // hover事件悬停和左右图标的动画效果
  slideBox.hover(function () {
    $(".next,.prev").animate({ "opcity": 1, }, 200);
    clearInterval(timer);
  },function(){
    $(".next,.prev").animate({ "opcity":0.5, }, 500);
    timer=setInterval(function(){
      sw++;
      if(sw == number.length.length){ sw=0; };
      number.eq(sw).trigger("click");
    },2000);
  })
})