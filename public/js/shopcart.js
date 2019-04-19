$(function () {
	// 引入头部
	$(".headerpage").load("header.html");
	// 引入底部
	$(".footerpage").load("footer.html")

	//请求购物车数据开始
	var uid = location.search.split("=")[1];
	//    console.log(uid)
	$.ajax({
		url: "shopcart",
		type: "get",
		data: { uid },
		dataType: "json",
		success: function (result) {
			//var result=result.data;
			console.log(result.data)
			var html = ""
			for (var res of result.data) {
				html += `  
          <div class="shop-list">
          <div class="list-input">
              <input type="checkbox">
          </div>
          <div class="shop-list2">
              <div class="list-img">
                  <img src="${res.img}">
              </div>
              <div class="list-name">
                  <a href="javascript:;">
                     ${res.pname}</a>
              </div >
              <div class="list-price">&yen;${res.price}</div>
              <div class="list-count">
                  <a href="javascript:;" class="btn-jian">－</a>
                  <input type="text" value="${res.count}">
                  <a href="javascript:;" class="btn-jia">＋</a>
              </div>
              <div class="list-sum" >&yen;${res.count * res.price} </div>
              <div class="list-shanchu">
                  <a href="javascript:;" class="del">删除</a>
              </div>
          </div>
      </div>`
			}//循环结束*
			$(".list").html(html)
			//    按钮点击事件  数量加 减
			$(".btn-jia").click(function () {
				var val = $(this).prev().val();
				val++;
				$(this).prev().val(val)
			})
			$(".btn-jian").click(function () {
				var val = $(this).next().val();
				val--;
				//    console.log(111)
				if (val < 1) {
					val = 1;
				}
				$(this).next().val(val)
			})
			// var price = $(".list-price").html().slice(1, );
			// console.log(price);
			// var count = $(".list-count input").val();
			// console.log(count);
			// var sum=price*count
			// console.log
			// $(".list-sum").html(price * count);
		}
	})//请求购物车数据结束

	//点击删除购物车开始
	$(".del").click(function () {
		$.ajax({
			url: "delet",
			type: "get",
			dataType: "json",
			success: function (result) {

			}
		})
	}) //删除购物车结束
})