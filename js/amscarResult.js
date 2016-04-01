$(document).ready(function(){
  //Poll for session data
  rpc(
    "php/login_delegate.php",
    {
      "action":"CHECKLOGINSTATUS"
    },
    function(data){
        //use login_iframe in util.js
        login_iframe(data);
        }
    );
  runRPC();
    //$("form").submit(function(e){e.preventDefault();runRPC();});
})

function runRPC(){
    $(".votenumber").each(function() {
        combination = this.id.split("_");
        var selection = {};
        selection["prize"] = combination[0];
        selection["nominee"]=combination[1];
        retrieveResult(selection, this.id);   
    });
}

function retrieveResult(selection, id){
    $.ajax({
      type:"POST",
      data:selection,
      url:"./php/amscarResult.php",
      success:function(data){
        $("#"+id).empty();
        $("#"+id).append("<h4>票数："+data+"</h4>");
      },
      error:function(data){
        console.log("Error");
        alertmodal('error',"Please contact amcisa.org/gh/contact.html for help.");
        console.log(data);
      }
    });
}

//This line below should be activated to test this submission system without the login system
//$("form").submit(function(e){e.preventDefault();runRPC();});


