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