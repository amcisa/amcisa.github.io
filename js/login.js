//login.js
$(document).ready(function(){
  $("#login-matric-no input.Matric_NO").focus();
  $("#login-matric-no .btn.go").click(function(e){
    e.preventDefault();
    $(this).html("Loading...");
    rpc(
      "php/login_delegate.php",
      {
        "action": "LOGIN",
        "Matric_NO": $("#login-matric-no input.Matric_NO").val(),
        "Password": $("#login-matric-no input.Password").val()
      }, 
      function(data){
        console.log("Data received.");
        console.log(data);
        refreshPreLoginState();
      })
  })
})

function refreshPreLoginState(){
  $("#login-matric-no .btn.go span").html("Login").show();
  $("#login-matric-no .btn.go i").hide();
}

function formdata(get_data){
  var data_form= new FormData();
  for (key in get_data){
    data_form.append(key,get_data[key]);
  }
  return data_form;
}

function rpc(rpc_url,form_data, success_callback){
  console.log("Sending data...");
  return $.ajax({
        type:"POST",
        data:formdata(form_data),
        url:rpc_url,
        processData:false,
        contentType:false,
        success: function(data){
          success_callback(data);
        },
        error:function(data){
          console.log("failed : ", data);
        }
      })
}