$(function () {
		$(document).ready(function(){
			$("#uname").focus();
		});

	
		// 注册
		function vali($,minlen,maxlen,msg){
			//验证当前文本框的内容长度
			var len=$.val().length;
			if(len>=minlen&&len<=maxlen){//如果长度>=3且<=10
			//找到当前文本框的下一个兄弟div，设置其内容
				$.next().html(`<img src='img/icon/ok.png'>`)
			}else{
				$.focus();
				$.next().html(`<img src='img/icon/err.png'>${msg}`);
			}
		}

		//为其绑定失去焦点事件：
		$("#uname").blur(function(){
			vali($(this),4,12,"用户名必须介于4~12位之间!");
		});
		$("#upwd1").blur(function(){
			vali($(this),6,10,"密码必须介于6~10位之间!")
		});
			
		// 密码确认
		$("#upwd2").blur(function(){
			if($("#upwd1").val()==$("#upwd2").val()){
				$("#upwdMsg2").html(`<img src="img/icon/ok.png"/>`)
				$("#upwdMsg1").html(`<img src="img/icon/ok.png"/>`)
			}else{
				$(this).focus();
				$("#upwdMsg2").html("密码不一致!")
			}
		})
		
		// 手机号码验证
		$("#phone").blur(function(){
			var phone = $("#phone").val();
			var reg1 = /^1[34578]\d{9}$/;
			if (!reg1.test(phone)) {
				$(this).focus();
				$("#phoneMsg").html("错误!如:176xxxx0903");
			}
			else {
				$("#phoneMsg").html(`<img src='img/icon/ok.png'>`)
			}
		})
		// 邮箱验证
		$("#email").blur(function(){
			var email = $("#email").val();
			var reg1 = /^[\w\d]{1,9}@[\w\d]{1,9}\.[\w]{2,3}$/;
			if (!reg1.test(email)) {
				$(this).focus();
				$("#emailMsg").html("错误!如:jack@163.com");
			}
			else {
				$("#emailMsg").html(`<img src='img/icon/ok.png'>`)
			}
		})

			// //查找表单，为其绑定submit事件
			// $("form").submit(function(e){
			// 	//如果两个都不是true
			// 	if(!($name&&$pwd1))
			// 		// alert("Submitted");
			// 		e.preventDefault();//阻止提交
			// });
	$("#register_button").click(function(){
		var uname=$("#uname").val();
		var upwd=$("#upwd1").val();
		var phone=$("#phone").val();
		var email=$("#email").val();
		var userName=$("#userName").val();
		$.ajax({//把$uname $upwd发送回去进行验证
			url:"http://localhost:3001/user/register",
			data:{uname,upwd,email,phone,userName},
			type:"get",
			dataType:"json" 
		})
		.then(function(result){
			console.log(result)
			// 如果返回值是1就登陆成功
			if(result==1){
					alert("该用户名已被注册,请修改用户名");
			}else{//否则登录失败
				alert("注册成功,点击跳转登录页面");location.href="user_login.html";
			}
		})
	})
})