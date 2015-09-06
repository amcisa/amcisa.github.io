//login.js
$(document).ready(function(){
  $("#login-matric-no input").focus();
  $("#login-matric-no .btn").click(function(e){
    e.preventDefault();
    $(this).html("Loading...");
    var data_form= new FormData();
    data_form.append("action", "checkuser");
    data_form.append("Matric_NO", $("#login-matric-no input").val());
    delegate(data_form, function(data){
      console.log(data);
      $("#login-matric-no .btn").html("Go!");
    })
  })
})

function delegate(formdata, callback){
  return $.ajax({
        type:"POST",
        data:formdata,
        url:"php/login_delegate.php",
        processData:false,
        contentType:false,
        success: function(data){
          callback(data);
        },
        error:function(data){
          console.log("failed : ", data);
        }
      })
}