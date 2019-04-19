// 引入头部底部HTML片段
$(function loadPag(no = 0) {
  // 引入头部
  $(".headerpage").load("header.html");
  // 引入底部
  $(".footerpage").load("footer.html")
  // 动态获取页面内容
  // var pno = no;
  $.ajax({
    url: "category?pno=1",
    type: "get",
    // data: { pno },
    dataType: "json",//自动JSON.parse()
    // 提前给
    success: function (result) {
      //1. 将商品基本信息显示到对应元素中
      var html = "";
      for (var p of result) {
        // console.log(p.pic)
        html += `<li>
        <div class="pro-panels">
          <p class="p-img">
            <a target="_blank" href="${p.href}" title="HUAWEI nova 4" onclick="pushListProClickMsg('2601010086603')">
              <img alt="nova 4  4800万超广角三摄 全网通版（贝母白）" src="${p.pic}">
            </a>
          </p>
          <p class="p-name">
            <a target="_blank" href="/product/10086254040251.html" title="HUAWEI nova 4" onclick="pushListProClickMsg('2601010086603')">
              <span>${p.title}</span>
              <span class="red"></span>
            </a>
          </p>
          <p class="p-price"><b>¥${p.price}</b></p>
          <div class="p-button clearfix">
            <table colspan="0" border="0" rowspan="0">
              <tbody>
                <tr>
                  <td>
                    <a target="_blank" href="/product/10086254040251.html" class="p-button-cart">
                      <span>选购</span>
                    </a>
                  </td>
                  <td>
                    <label class="p-button-score">
                      <span>10286人评价</span>
                    </label>
                  </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <s class="p-tag"><img src="img/product/tag2.png"></s>
        </div>
        </li>`
      }
      var ul = document.querySelector(".layout .pro-list ul");
      ul.innerHTML = html;

      // // 分页
      // var html="";
      // for (var i = 0; i < result.pageCount; i++) {
      //   // html += `<div class="page-item on">${i + 1}</div>`
      //   console.log(result.pageCount);
      //   html+=`<li class="page-item"><a class="page-link bg-transparent" href="#">${i + 1}</a></li>`
      // }
      // $(".page-prev~li").html(html)
      // $(".pagination>li").click(function () {
      //   var $a = $(this)
      //   if ($a.index() == 1) {
      //     loadPage(no = 0)
      //   } else if ($a.index() == 2) {
      //     loadPage(no = 1)
      //   }
      // })
    }

  })



  // 分页按钮点击
  $(".pagination li.page-item").click(function () {
    $(".pagination li.page-item").eq($(this).index()).addClass("redPage").siblings().removeClass("redPage");
  })
  // 上一页
  var i = 0;
  var len = $(".page-item").length;
  $(".page-prev").click(function(){
    
  })

})