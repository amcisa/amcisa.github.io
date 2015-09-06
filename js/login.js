//login.js
$(document).ready(function(){
  $("#login-matric-no input").focus();
  $("#login-matric-no .btn").click(function(e){
    e.preventDefault();
    $(this).html("Loading...");
    delegate(formdata({
      "action": "checkuser",
      "Matric_NO", $("#login-matric-no input").val()
    }), function(data){
      console.log(data);
      $("#login-matric-no .btn").html("Go!");
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