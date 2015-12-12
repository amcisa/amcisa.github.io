//session.js
$(document).ready(function(){
  //Poll for session data
  rpc(
    "php/login_delegate.php",
    {
      "action":"CHECKLOGINSTATUS"
    },
    function(data){
      if(data==0){
        window.location.href="index.html";
      }
      replaceDataInPersonalInformation(JSON.parse(data));
      listenHallDataChanges();
      listenSecondarySchoolChanges();
      listenTextInputChanges("Password","Password length should exceed 7 characters!", function(data){        
        return data.length>=8 || data.length==0;
      })
      listenTextInputChanges("Password","Old Password is empty!", function(data){
        var oldPasswordval = $(".oldPassword .col-lg-10").children().first().val();
        var Passwordval = $(".Password .col-lg-10").children().first().val();
        if((oldPasswordval!="" && Passwordval!="") || (oldPasswordval=="" && Passwordval=="")){
          $(".oldPassword .col-lg-10").removeClass("has-error");
          return true;
        }else{
          $(".oldPassword .col-lg-10").addClass("has-error");
          return false;
        }
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
      listenTextInputChanges("Phone_MY","Phone format example: 0161234567", function(data){
        return (data.match(/^\d{10,11}$/) || data=="");
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

function listenSecondarySchoolChanges(){
  var secelem = $(".Secondary_School .col-lg-10");
  function Change(){
    if(secelem.children().first().find(":selected:contains(其他)").html()){
      $(".Secondary_School_Others").removeClass("hide");
    }else{
      $(".Secondary_School_Others").addClass("hide");
    }
  }
  Change();
  secelem.change(function(){
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
      rpc(
        "php/login_delegate.php",
        formToCustomObj(jsondata),
        function(data){
          console.log(data);
          $(".submit span").html("Update!");
          $(".submit i").addClass("hide");
          if(data==1){
            alertmodal("success","Your info has been successfully updated!");            
          }else if(data==0){
            alertmodal("error","Database update error! Try again later or contact <a href=\"contact.html\"> the web admin.</a>");
          }else if(data==-1){
            alertmodal("error","There is nothing to be updated.");
          }else if(data==-2){
            alertmodal("error","Wrong current password entered. Nothing have been updated.");
          }
        }
      )
    }
  })
}

function formToCustomObj(jsondata){
  var newjsondata={};
  //note that the data from newjsondata does not contain the password.
  //note of course, that we should be sending this over a secure protocol
  //but that would have to depend on our budget to buy a SSL certificate
  jsondata["oldPassword"]="";
  jsondata["Password"]="";
  for(key in jsondata){
    var targetchild = $("."+key+" .col-lg-10").children().first();
    if((targetchild.is("input") || targetchild.is("textarea")) && targetchild.val()){
      newjsondata[key]=targetchild.val();
    }else if(targetchild.is("select")){
      
      if (key == "Secondary_School" && targetchild.val() == '其他'){ 
          var other_sec = $(".Secondary_School_Others .col-lg-10").children().first();
          newjsondata["Secondary_School"] = other_sec.val();
      
      }else{
        newjsondata[key]=targetchild.find(":selected").text();
      }
      
    }
  }
  newjsondata["action"]="UPDATEINFO";
  return newjsondata;
}

