//login.js
$(document).ready(function(){
  $("#login-matric-no input.Matric_NO").focus();
  $("#login-matric-no .btn").click(function(e){
    e.preventDefault();
    $(this).html("Loading...");
    rpc(
      "php/login_delegate.php",
      {
        "action": "checkuser",
        "Matric_NO": $("#login-matric-no input").val()
      }, 
      function(data){
        $("#login-matric-no label").html("Matriculation Number");
        $("#login-matric-no").removeClass("has-error");
        $("#login-matric-no .btn").html("Go!");
        if(data==1){
          $("#login-matric-no input.Password").removeClass("hide").focus();
        }else if(data==2){
          console.log("First Time Login. Send Email to Confirm");
        }else if(data==0){
          console.log("User Not Found. Prompt sign up");
        }else if(data==-1){
          $("#login-matric-no label").html("Matriculation Number : Format Error");
          $("#login-matric-no").addClass("has-error");
        }
      })
  })
})

function formdata(get_data){
  var data_form= new FormData();
  for (key in get_data){
    data_form.append(key,get_data[key]);
  }
  return data_form;
}

function rpc(rpc_url,form_data, success_callback){
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