//login.js
$(document).ready(function(){
  $("#login-matric-no input.Matric_NO").focus();
  $("#login-matric-no .btn.go").click(function(e){
    e.preventDefault();
    $("#login-matric-no .btn.go span").html("");
    $("#login-matric-no .btn.go i").removeClass("hide");
    rpc("php/login_delegate.php",
      { "action": "LOGIN",
        "Matric_NO": $("#login-matric-no input.Matric_NO").val(),
        "Password": $("#login-matric-no input.Password").val()})
    .then(
      function(data){
        console.log("Data received.");
        console.log(data);
        refreshPreLoginState();
        if(data==1){
          window.location.href="index.html"; 
        }else if(data==3){
          wrongPassword();
        }else if(data==-1){
          userNameNotFound();
        }
      })
  })
})

function refreshPreLoginState(){
  $("#login-matric-no .btn.go span").html("Log in").show();
  $("#login-matric-no .btn.go i").addClass("hide");
  $(".alert-tab").addClass("hide");
}
function wrongPassword(){
  $(".alert-tab strong").html("Wrong Password");
  $(".alert-tab").removeClass("hide");
}
function userNameNotFound(){
  $(".alert-tab strong").html("Matriculation Number Not Found");
  $(".alert-tab").removeClass("hide");
}
