// 引入头部底部HTML片段
$(function(){
  // 引入头部
  $(".headerpage").load("header.html");
  // 引入底部
  $(".footerpage").load("footer.html")
  //首页右下角侧边栏ul列表显示及固定
  var ul_height = $("#floor1").offset().top;//利用div模块定义侧边栏显示高度
  $(window).scroll(function(){
    var this_scrollTop = $(this).scrollTop();
    if(this_scrollTop>ul_height){
      $("#toTop").show();
    }else if(this_scrollTop<ul_height){
      $("#toTop").hide();
    }
  });
})

window.onload=function(){
  //function ajax({url,type,data,dataType})
    //return new Promise(function(open){})
      //open(xhr.responseText)
    ajax({
      url:"http://localhost:3001/index",
      type:"get",
      //data:undefined
      dataType:"json"//告诉ajax，将json字符串自动转为对象
    })
    .then(function(res){//括号内为形参名字自定义
      // console.log(res);//测试地址
      // var p=res[0];
      //复制页面上第一个商品卡片的HTML片段，并用模板字符串，填充其中动态生成的部分
      var html="";
      for(var i=0;i<4;i++){
        var p=res[i];
        // console.log(p);
        html+=`<li class="list-item">
      <a href="${p.href}" class="tu">
        <img src="${p.pic}" alt="">
      </a></li>
      `;
      }
      //将片段填充回页面中原父元素内: 
      var div=document.querySelector(
        "#floor1>div:nth-child(2)>ul:nth-child(1)"
      );
      // console.log(div);
      div.innerHTML=html;
      var html="";
      for(var i=4;i<7;i++){
        var p=res[i];
        // console.log(p);
        html+=`<li class="list-item item-da">
        <a href="#" class="tu">
          <div class="item-da-zi">
            <div class="item-zi">
              <div class="item-title"><h4>${p.title}</h4> </div>
              <p clas="item-desc">${p.subtitle}</p><br>
              <p class="item-price">￥${p.price}</p>
              </div>
            </div>
            <p><img src="${p.pic}" alt=""></p>
          </a>
        </li>
      `;
      }
      //将片段填充回页面中原父元素内: 
      var div2=document.querySelector(
        "#floor1>div:nth-child(2)>ul:nth-child(2)"
      );
      div2.innerHTML=html;
  })
}