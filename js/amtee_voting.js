$(document).ready(function(){
  //Poll for session data
  //Require login. Function in util.js
  rpc(
    "php/login_delegate.php",
    {
      "action":"CHECKLOGINSTATUS"
    },
    function(data){
        //use login_iframe in util.js
        console.log('here');
        login_iframe(data);
        })

    $(".btn-success").onclick = function(e){
        e.preventDefault();
        runRPC();
    };
})

function runRPC(){
    console.log('running rpc');
    rpc(
        "php/login_delegate.php",
        {
          //"action":"READUSERNAME_EN"
          "action":"READUSERNAME_CH"
        },
        function(data){

            //var randomnumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
            //console.log(randomnumber);
            var selection = {};
            selection["Username"] = data;
            selection["Vote"] = "0";
            var idnum;
            //selection[Username] = name;
            for (idnum=1;idnum<8;idnum++){
                if ($("#"+idnum.toString()).is(':checked'))
                    selection["Vote"] = $("#"+idnum.toString()).val();
            }
            console.log(selection);
            if (selection["Vote"] == "0"){
                console.log('no vote');
                alertmodal("error","你尚未选择你所想要的设计！");
            }
            else{
                $.ajax({
                  type:"POST",
                  data:selection,
                  url:"./php/amtee_voting.php",
                  success:function(data){
                    console.log("Success");
                    console.log(data);
                    if(data==1){
                        alertmodal("success","感谢你的投票！");
                        console.log('success vote');
                        window.location.href="amtee_result.html";
                    }
                    else if (data==-1){
                        alertmodal("error","非常抱歉，一人只有一票！系统显示你之前已经投票！");
                        console.log('cannot vote');
                    }
                    else{
                        //console.log(data);
                        console.log('something wrong');
                        alertmodal('error',"Voting failed. Please contact amcisa.org/gh/contact.html for help. State your Matriculation Number.");
                    }
                  },
                  error:function(data){
                    console.log("Error");
                    alertmodal('error',"Voting failed. Please contact amcisa.org/gh/contact.html for help. State your Matriculation Number.");
                    console.log(data);
                  }
                });
            }
        })
}

function click(){
    console.log('hello');
}