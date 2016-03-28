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
        console.log('here');
        login_iframe(data);
        }

    )
    //$("form").submit(function(e){e.preventDefault();runRPC();});
})

function runRPC(status){
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
    $("#submitButton").removeClass("disabled");
    var votesleft = 10;
    var votes = 0;
    var combination = '';
    var counter = 0;

    if($(".name").length != $(".dropdown").length)
        alertmodal("alignment error");

    for(var key in idlist){
        var currentvote = parseInt($("#"+key+" option:selected").text());
        if (currentvote > 0){
            votes += currentvote;
            combination += "<h5>"+key.split("_")[0]+" - "+idlist[key]+": "+currentvote+"票"+"</h5>";
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
        alertmodal("success","成功！");
    });
    
}


//This line below should be activated to test this submission system without the login system
//$("form").submit(function(e){e.preventDefault();runRPC();});


