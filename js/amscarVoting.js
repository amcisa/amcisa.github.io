$(document).ready(function(){
  //Poll for session data
  $("#votesleft").append('<h2>10</h2>');
  $("#combination").append('<h2>无</h2>');
  $("#submitButton").addClass("disabled");
  rpc(
    "php/login_delegate.php",
    {
      "action":"CHECKLOGINSTATUS"
    },
    function(data){
        //use login_iframe in util.js
        login_iframe(data);
        }

    )
    //$("form").submit(function(e){e.preventDefault();runRPC();});
})

function runRPC(){
    var idlist = {};
    var counter = 0;
    $(".dropdown").each(function() {
        idlist[this.id] = ($(".name")[counter]).outerHTML.slice(17,-5);
        counter += 1;
    });
    console.log(idlist);
    $("#profile").onclick = checkvotes(idlist);
}

function checkvotes(idlist){
    console.log(idlist);
    $("#submitButton").removeClass("disabled");
    var votesleft = 10;
    var votes = 0;
    var combination = '';
    var counter = 0;
    var voteList = {};

    if($(".name").length != $(".dropdown").length)
        alertmodal("alignment error");

    for(var key in idlist){
        var currentvote = parseInt($("#"+key+" option:selected").text());
        if (currentvote > 0){
            votes += currentvote;
            combination += key.split("_")[0]+" - "+idlist[key]+": "+currentvote+"票"+"<br>";
            var mapping = {};
            mapping[idlist[key]] = currentvote;
            if ((key.split("_")[0]) in voteList){
                voteList[key.split("_")[0]].push(mapping);
            }
            else{
                voteList[key.split("_")[0]] = [];
                voteList[key.split("_")[0]].push(mapping);
            }
        }
        
    }
    votesleft -= votes;
    if (combination == ''){
        combination += "<h5>无</h5>";
        $("#submitButton").disabled = true;
        $("#submitButton").addClass("disabled");
        console.log('no vote');
    }

    else if (votesleft < 0){
        alertmodal("error","一人只有10票，你的投票已经超越上限！请调整你的票数分配。");
        $("#submitButton").disabled = true;
        $("#submitButton").addClass("disabled");
        console.log('over vote');
    }

    $("#votesleft").empty();
    $("#combination").empty();
    $("#votesleft").append('<h2>'+votesleft+'</h2>');
    $("#combination").append('<h2>'+combination+'</h2>');

    $("#submitButton").click(function(){
        write_to_db(voteList);
        alertmodal("success","成功！");
    });
    
}

function write_to_db(voteList){
    rpc(
        "php/login_delegate.php",
        {
          //"action":"READUSERNAME_EN"
          "action":"READUSERNAME_CH"
        },
        function(data){
            var myVoteList = {};
            myVoteList["selection"] = {data:voteList};
            $.ajax({
                  type:"POST",
                  data:myVoteList,
                  url:"./php/amscarVoting.php",
                  success:function(data){
                    if (data == 1){             //first time voter
                        alertmodal("success","投票成功！");
                    }
                    else if (data == -1){
                        alertmodal("error","非常抱歉！系统显示你曾经投票了！");
                    }
                    else{
                        alertmodal('error',"Voting failed. Please contact amcisa.org/gh/contact.html for help. State your Matriculation Number.");
                        console.log(data);
                    }
                  },
                  error:function(data){
                    console.log("Error");
                    alertmodal('error',"Voting failed. Please contact amcisa.org/gh/contact.html for help. State your Matriculation Number.");
                    console.log(data);
                  }
                });
        });
}

//This line below should be activated to test this submission system without the login system
//$("form").submit(function(e){e.preventDefault();runRPC();});


