//session.js
$(document).ready(function(){
  //Poll for session data
  rpc("php/login_delegate.php",{"action":"CHECKLOGINSTATUS"})
  .then(function(data){
      if(data==0){
        window.location.href="index.html";
      }
      replaceDataInPersonalInformation(JSON.parse(data));
      listenHallDataChanges();
      listenTextInputChanges("Password","Password length should exceed 8 characters!", function(data){
        return data.length>8;
      })
      listenTextInputChanges("Email_Personal","Email format is wrong!", function(data){
        return (data.match(/.+@\w+\.\w+$/i));
      })
      listenTextInputChanges("Email_School","Email format is wrong, should end with e.ntu.edu.sg.", function(data){
        return (data.match(/.+@e.ntu.edu.sg$/i));
      })
      listenTextInputChanges("Phone_SG","Phone format example: 87613173", function(data){
        return (data.match(/^\d{8}$/));
      })
      checkDataSubmitted(JSON.parse(data));
      
      //console.log(JSON.stringify(formToCustomObj(JSON.parse(data))));
    }
  )
})

function replaceDataInPersonalInformation(jsondata){
  for(key in jsondata){
    var targetchild = $("."+key+" .col-lg-10").children().first();
    if(targetchild.is("input") || targetchild.is("textarea")){
      targetchild.attr("value",jsondata[key]);
    }else if(targetchild.is("select")){
      targetchild.find(":contains("+jsondata[key]+")").attr("selected","true");
    }
  }
}

function listenHallDataChanges(){
  var hallelem=$(".Hall .col-lg-10");
  function Change(){
    if(hallelem.children().first().find(":selected:contains(outside)").html()){
      $(".Address_Outside").removeClass("hide");
      $(".halldata").addClass("hide");      
    }else{
      $(".Address_Outside").addClass("hide");
      $(".halldata").removeClass("hide");
    }
  }
  Change();
  hallelem.change(function(){
    Change();
  })
}

function listenTextInputChanges(tag, message, func){
  var genelem=$("."+tag+" .col-lg-10").children().first(); 
  genelem.change(function(){
    if(!func(genelem.val())){
      genelem.parent().addClass("has-error");
      alertmodal('error',message);
    }else{
      genelem.parent().removeClass("has-error");
    }
  })
}

function checkDataSubmitted(jsondata){
  //serverside will escape all characters only.
  $("form").submit(function(e){
    e.preventDefault();
    if(!$(".has-error").html()){
      $(".submit span").html("");
      $(".submit i").removeClass("hide");
      rpc("php/login_delegate.php",formToCustomObj(jsondata))
      .then(function(data){
          console.log(data);
          $(".submit span").html("Update!");
          $(".submit i").addClass("hide");
          alertmodal("success","Your info has been successfully updated!");
        }
      )
    }
  })
}

function formToCustomObj(jsondata){
  var newjsondata={};
  for(key in jsondata){
    var targetchild = $("."+key+" .col-lg-10").children().first();
    if((targetchild.is("input") || targetchild.is("textarea")) && targetchild.val()){
      newjsondata[key]=targetchild.attr("value");
    }else if(targetchild.is("select")){
      newjsondata[key]=targetchild.find(":selected").text();
    }
  }
  newjsondata["action"]="UPDATEINFO";
  return newjsondata;
}

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
    $(".modal").removeClass("bounceInDown").addClass("bounceOutUp");
  })
  $("body").click(function(e){
    if($(e.target).children().first().is(".modal-dialog")){
      $(".modal").removeClass("bounceInDown").addClass("bounceOutUp");
    }
  })
}