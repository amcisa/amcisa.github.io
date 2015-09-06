//login.js
$(document).ready(
  submitloginmatricno()
)

function submitloginmatricno(callback){
  $("#login-matric-no").focus();
  $("#submit-login-matric-no").click(function(e){
    e.preventDefault();
    $(this).html("Loading...");
    var data_form= new FormData();
    data_form.append("MatricNo", $("#login-matric-no").val());
    $.ajax({
        type:"POST",
        data:data_form,
        url:"/secure/checkuser.php",
        processData:false,
        contentType:false,
        success: function(data){
          callback(data);
          $(this).html("Go!");
        },
        error:function(data){
          console.log("failed logged in");
        }
      })
  })
}