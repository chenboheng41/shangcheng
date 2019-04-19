// 引入头部底部HTML片段
$(function(){
  // 引入头部
  $(".headerpage").load("header.html");
  // 引入底部
  $(".footerpage").load("footer.html")
  // 动态获取页面内容
  $.ajax({
    url: "category",
    type: "get",
    dataType: "json",//自动JSON.parse()
    // 提前给
    success: function (result) {
      // console.log(result[0]);
      //1. 将商品基本信息显示到对应元素中
      var html="";
      for(var i=0;i<result.length;i++){
        var p=result[i];
        // console.log(p.pic)
        html+=`<li>
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
      var ul=document.querySelector(".layout .pro-list ul");
      ul.innerHTML=html;
    }

  })






  $(".pagination li.page-item").click(function (){
    $(".pagination li.page-item").eq($(this).index()).addClass("redPage").siblings().removeClass("redPage");
  })
  

})