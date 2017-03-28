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

function alertmodal(type,message){
  swal({
    title: "Hello!",
    html: true,
    text: "<h3>"+message+"</h3>",
    allowOutsideClick: true,
    type: type
  })
}

function login_iframe(data){
  if(data==0){
    console.log('Not login yet');
    
    $('#login_frame').removeClass('hide');
    $('.wrapper').addClass('hide');

    $(".alert-tab strong").html("You have not successfully login in. Please login to continue. \nPlease click the REFRESH button if you have successfully login but only the content in iframe changes.");
    $(".alert-tab").removeClass("hide");

    $('#login_frame').load(function(){
        var iframe = $('#login_frame').contents();
        iframe.find('.go').click(function(e){
            $('#login_frame').hide();
            rpc(
            "php/login_delegate.php",
            {
              "action":"CHECKLOGINSTATUS"
            },function(data){
                if(data!=0){
                    console.log("Refreshing");
                    window.top.location.reload();
                }else{
                    $('#login_frame').show();
                }
            });
        });
    });

    }
        
  else{
      $('#login_frame').addClass('hide');
      $('.wrapper').removeClass('hide');
      }
}

function scrollToElement(ele) {
    $('html,body').animate({scrollTop: ele.offset().top-50, duration: 300}).clearQueue();
    return false;
}