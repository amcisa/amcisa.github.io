//admin.js
$(document).ready(function(){
  rpc(
    "php/admin_delegate.php",
    {
      "action":"CHECKIFADMIN"
    },
    function(data){
      //console.log(data);
      if(data==1){
        console.log("he is admin")
        $(".admin").removeClass('hidden');
        rpc(
          "php/admin_delegate.php",
          {
            "action":"GETALLUSEREMAILS"
          },
          function(data){
            console.log(data.NTU);
            data=JSON.parse(data);
            $("#admin_emails").html(data.NTU);
            $("#admin_emails").on('mouseup', function() {$(this).select(); });
            $("#admin_school").change(function(event) {
              $("#admin_emails").html(data[$(this).find(":selected").text()]);
            });
            $("#admin_copy").click(function(e) {
              $("#admin_emails").select();
              document.execCommand("copy");
              alertmodal("success","Emails copied. You can now paste to your outlook email.")
            })
        })
      }
  })
})
