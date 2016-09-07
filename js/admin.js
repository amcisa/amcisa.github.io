//admin.js
$(document).ready(function(){
  rpc(
    "php/admin_delegate.php",
    {
      "action":"CHECKIFADMIN"
    },
    function(data){
      if(data==1){
        console.log("he is admin")
        $(".admin").removeClass('hidden');
        console.log("???")
      }
  })
})