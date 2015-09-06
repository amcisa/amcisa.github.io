//login.js
$(document).ready(function(){
  $("#login-matric-no input").focus();
  $("#login-matric-no .btn").click(function(e){
    e.preventDefault();
    $(this).html("Loading...");
    var data_form= new FormData();
    data_form.append("action", "checkuser");
    data_form.append("MatricNo", $("#login-matric-no").val());
    $.ajax({
        type:"POST",
        data:data_form,
        url:"php/login_delegate.php",
        processData:false,
        contentType:false,
        success: function(data){
          console.log(data);
          $(this).html("Go!");
        },
        error:function(data){
          console.log("failed logged in");
        }
      })
  })
})
