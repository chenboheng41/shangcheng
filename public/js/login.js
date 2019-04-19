$(function () {
  $(document).ready(function(){
    $("#uname").focus();
  });
  $(".button_login").focusout(function () {
    var $uname = $("input.uname").val();
    var $upwd = $("input.upwd").val();
    console.log($uname + ":" + $upwd)
    // 验证输入内容是否符合规范
    var reg = /^[a-z0-9]{3,15}$/i;
    if (!reg.test($uname)) {
      $("#uname").focus();
      $(".errUname").show().html("用户名格式不正确!");
      return false;
    }else{
      $(".errUname").hide();
      return true;
    };
    if (reg.test($upwd)==false) {
      $("#upwd").focus();
      $(".errUpwd").show().html("密码格式不正确!");
    return false;
    }
  })
})