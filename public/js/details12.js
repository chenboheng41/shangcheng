$(function () {
  // 引入头部
  $(".headerpage").load("header.html");
  // 引入底部
  $(".footerpage").load("footer.html")
  //获得地址栏中的search部分
  //将search按=切割，取第2部分
  var search = location.search;
  if (search !== "") {
    var lid = search//?lid=9
      .split("=")//[?lid, 9]
    [1];//9
    
    //DOM内容加载后提前执行
    // alert(lid)
    $.ajax({
      url: "details",
      type: "get",
      data: { lid },
      dataType: "json",//自动JSON.parse()
      // 提前给
      success: function (output) {
        // console.log(output);
        //从output大对象中解构出三个小部分分别使用
        var { product, specs, pics } = output;
        // console.log(output)
        
        // 添加商品到购物车
        $("#tab-addcart-button").click(function(){
          var pname=product.title
          var price=product.price;
          var img=pics[0].sm;
          var val=$("#pro-quantity").val()
          console.log(img);
        $.ajax({
          url: "addcart",
          type: "get",
          data: { lid,pname,price,img,val},
          dataType: "json",
        })
        .then(function(result){
          // console.log(result)
          // 如果返回值是1就登陆成功
          if(result==1)
              alert("商品添加购物车成功");
        })
      })
        //1. 将商品基本信息显示到右上方的对应元素中
        $("#product-property-recommand>.product-meta>.pro-name")
          .html(product.title)
          .next().children("span")
          .html(product.subtitle);
        if (product.price === undefined)
          product.price = 0;
        $("#pro-price")
          .html(`¥${product.price.toFixed(2)}`)

        /*将颜色列表添加到页面*/
        var html = "";//准备空字符串拼接多个<a>
        //遍历specs数组中每个规格对象
        //specs:[ {spec对象}, {spec对象}, ...]
        for (var spec of specs) {
          //spec对象:{lid:商品编号,spec:规格名}
          //每遍历一个规格对象就拼接一段<li>到html中
          html += `<li class="selected">
          <div class="sku"><a class="${spec.pid == lid ? 'active' : ''}" href="product_details.html?lid=${spec.family_id}" title="亮黑色"><img src="img/product/sm/11.jpg" alt="亮黑色"><p><span>${spec.color}</span></p></a></div>
            </li>`
        }
        //将HTML放入对应div中
        $("#pro-skus dl ul")
          .html(html);

        /*将规格列表添加到页面*/
        var html = "";//准备空字符串拼接多个<a>
        //遍历specs数组中每个规格对象
        //specs:[ {spec对象}, {spec对象}, ...]
        for (var spec of specs) {
          //spec对象:{lid:商品编号,spec:规格名}
          //每遍历一个规格对象就拼接一段<li>到html中
          html += `<li class="selected">
          <div class="sku"><a class="${spec.pid == lid ? 'active' : ''}" href="product_details.html?lid=${spec.pid}"><p><span>${spec.spec}</span></p></a></div>
          </li>`
        }
        //将HTML放入对应div中
        $("#pro-skus>dl:nth-child(2) ul")
          .html(html);


        //3. 将图片列表动态生成到左边的放大镜中
        //3.1 将小图片生成列表，放入中图的底部
        var html = "";
        for (var p of pics) {
          html += `<li>
          <img class="my-small" src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}" alt="HUAWEI Mate 20 6GB+64GB 全网通版（亮黑色）">
          </li>`
        }
        $("#pro-gallerys").html(html).css("width", 68 * pics.length);
        //3.2 取出第一张图片的中图片版本，放在中图片中
        $(".mousetrap img")
          .attr("src", pics[0].md);
        //第一张图片的大图片应该放在隐藏的大div中
        var $divLg = $("#div-lg")
          .css(
            `background-image`, `url(${pics[0].lg})`
          );
        // var backgroundImage=`url(${pics[0].lg})`;
        // var $divLg = $("#div-lg").css({backgroundImage})
        // var $divLg=$("#div-lg").css({
        //   backgroundColor:`#ca151d`
        // });

        $(".product-gallery .product-gallery-thumbs .my-small").mouseover(function () {
          var $img = $(this);
          //获得当前img上的自定义属性data-target的值
          var src = $img.attr("data-md");
          //.prop()
          //修改到class为my-big的大图片的src属性上
          $(".my-big").attr({ src });
          //.attr({src属性:src变量})
          //.attr("src",src);
          //.prop(...)
          var backgroundImage=`url(${$img.attr("data-lg")})`;
          //修改大图片的backgroundImage
          $divLg.css({backgroundImage});
        })

        //小图片列表左右移动:
        //如果pics的图片张数<=4，就要禁用右边按钮
        if (pics.length <= 5)
          $(".product-gallery-nav>.product-gallery-forward")
            .addClass("disabled");

        //查找要修改的ul
        var $ulImgs = $("#pro-gallerys")
        var moved = 0;
        //单击右边按钮向左移动一个li
        $(".product-gallery-forward")
          .click(function () {
            var $btnRight = $(this);
            //如果当前按钮不是禁用的
            if (!$btnRight.is(".disabled")) {
              moved++;//左移的li个数+1
              //ul的marginLeft永远等于moved*-68
              $ulImgs.css("margin-left", -68 * moved);
              //如果多余的li已经移动完了,就禁用当前按钮
              if (pics.length - moved == 5)
                $btnRight.addClass("disabled");
              //只要右边按钮点了一下，左边按钮一定启用
              $btnRight.prevAll("a").removeClass("disabled")
            }
          })
        //点击左边按钮向右移动一个li
        $(".top_left")
          .click(function () {
            var $btnLeft = $(this);
            //如果当前按钮不是禁用的
            if (!$btnLeft.is(".disabled")) {
              moved--;//左移的li个数-1
              //ul的marginLeft永远等于moved*-68
              $ulImgs.css("margin-left", 68 * moved);
              //如果左移的li个数为0,就禁用当前按钮
              if (moved == 0)
                $btnLeft.addClass("disabled");
              //只要左边按钮点了一下，右边按钮一定启用
              $btnLeft.nextAll("a").removeClass("disabled")
            }
          })
      }
    })
  }
  //4. 鼠标进入superMask，显示遮罩层和大图片
  //   鼠标移出superMask，隐藏遮罩层和大图片
  var $mask = $("#mask");
  var $smask = $("#super-mask");
  var max = 274;//superMask450-mask176
  var $divLg = $("#div-lg");
  $smask.hover(function () {
    $mask.toggleClass("d-none");
    $divLg.toggleClass("d-none");
  })
    //5. mask跟随鼠标移动，并同步移动大div的背景图片位置
    .mousemove(function (e) {
      var left = e.offsetX - 88;
      var top = e.offsetY - 88;
      if (left < 0) left = 0;
      else if (left > max) left = max;
      if (top < 0) top = 0;
      else if (top > max) top = max;
      $mask.css({ left, top });
      var backgroundPosition =
        `${-2 / 1 * left}px ${-2 / 1 * top}px`;
      $divLg.css({ backgroundPosition });
    })
  //右侧小标题鼠标悬浮显示隐藏效果
  $("#skuPromWord span").hide();
  $("#skuPromWord a:nth-child(2)").hover(function () {
    // 找到自己下边的.content
    var $content = $(this).next();
    // 如果自己下边的.content是显示的
    if ($content.is(":visible")) {
      // 只要关闭自己下边的.content
      $content.hide();
    } else {// 否则(自己下边是关着的)
      // 先打开自己下边的.content
      $content.show()
    }
  })

  //购物车商品添加数量按钮
  $(".btn-jia").click(function(){
    var val=$(this).prev().val();
    val++;
    $(this).prev().val(val)
  })

  var count=$("#pro-quantity").val();
  console.log(count);
  console.log($("#pro-quantity-plus"));
  $("#pro-quantity-plus").click(function(){
    var val=$("#pro-quantity").val();
    val++;
    $("#pro-quantity").val(val);
  })
  $("#pro-quantity-minus").click(function(){
    var val=$("#pro-quantity").val();
      val--;
      if(val<1){
        val=1;
      }
      $("#pro-quantity").val(val);
  })

  // 详情导航鼠标点击文字变为红色
  $("#layoutRelative p a").click(function () {
    $("#layoutRelative p a").eq($(this).index()).addClass("selected").siblings().removeClass("selected");
  })

  // 详情导航固定于顶部
  var height = $("#layoutRelative").offset().top;
  $(window).scroll(function () {
    var this_scrollTop = $(this).scrollTop();
    if (this_scrollTop > height) {
      $("#product-tab").addClass("product-tap-top");
      $("#product-tab div:nth-child(2)").css("display", "block");
    } else if (this_scrollTop < height) {
      $("#product-tab").removeClass("product-tap-top");
      $("#product-tab div:nth-child(2)").css("display", "none")
    }
  });

  // 详情内容过多显示隐藏
  $("#kindPicture p:gt(3)").hide();
  $("#pro-detail-down-btn").click(function () {
    $("#kindPicture p").show();
    $("#detail-content-button").hide();
  })

  // 用户评价鼠标点击文字变为红色
  $("#productCommentId ul li").click(function () {
    $(this).addClass("current").siblings().removeClass("current");
  })

  // 用户评价中图片放大效果
  $("#img-small a")

})