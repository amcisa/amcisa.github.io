//session.js
$(document).ready(function(){
  //Poll for session data
  rpc(
    "php/login_delegate.php",
    {
      "action":"CHECKLOGINSTATUS"
    },
    function(data){
      replaceLoginButtonWithProfileLink(JSON.parse(data));
      listenforsignOut();
    }
  )
})

function replaceLoginButtonWithProfileLink(data){
  //change to absolute link to amcisa.org/gh/profile.html later on
  console.log(data);
  if(data){
    $(".user-login").html("<a href=\"#\" class=\"user-login dropdown-toggle\" role=\"button\" aria-expanded=\"false\" data-toggle=\"dropdown\">Hi, "+data["Name_CH"]+"</a><ul class=\"dropdown-menu\" role=\"menu\"><li><a href=\"profile.html\"><i class=\"fa fa-fw fa-cog\"></i>个人资料</a></li><li><a href=\"#signout\"><i class=\"fa fa-fw fa-sign-out\"></i>登出</a></li></ul>");
    $(".user-login .dropdown-menu>li>a").css("color","black").css("text-align","center");
  }else{
    $(".user-login").html("<a href=\"login.html\">登入戶口</a>");
  }
}

function listenforsignOut(){
  $(".user-login").on('click',function(e){
    if($(e.target).attr("href")=="#signout"){
      rpc(
        "php/login_delegate.php",
        {
          "action":"LOGOUT"
        },
        function(data){
          window.location.href="index.html";
        }
      )
    }
  })
}