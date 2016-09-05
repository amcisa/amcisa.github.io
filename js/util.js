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

/*
function alertmodal(type,message){
  if(type=="error"){
    $(".modal .success").addClass("hide");
    $(".modal .error").removeClass("hide");
  }else if(type=="success"){
    $(".modal .success").removeClass("hide");
    $(".modal .error").addClass("hide");
  }
  $(".body-content").html(message);
  $(".modal").removeClass("bounceOutUp").show().addClass("bounceInDown"); 
  $("button[data-dismiss='modal']").click(function(){
    $(".modal").removeClass("bounceInDown").addClass("bounceOutUp").fadeOut(1000);
  })
  $("body").click(function(e){
    if($(e.target).children().first().is(".modal-dialog")){
      $(".modal").removeClass("bounceInDown").addClass("bounceOutUp").fadeOut(1000);
    }
  })
}
*/

function alertmodal(type,message){
  swal({
    text: message,
    type: type
  })
}

function scrollToElement(ele) {
    $('html,body').animate({scrollTop: ele.offset().top-50, duration: 300}).clearQueue();
    return false;
}