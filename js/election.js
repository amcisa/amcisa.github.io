var maxNo = {
  "President"     : 1,
  "VicePresident" : 1,
  "Secretary"     : 1,
  "Treasurer"     : 1,
  "Editor"        : 2,
  "Log"           : 2,
  "Webdev"        : 2,
  "Programmer"    : 3
  };

var portfolios = Object.keys(maxNo);
var selection = {};

$(document).ready(function(){

  $('.matric-block').hide();
  $('.voting-block').hide();
  $('.confirm-success.confirm-jump.animated').hide();
  $('.confirm-error.confirm-jump.animated').hide();
  
  $(".login-block input").focus();
  $(".login-block input").on('keydown', function(e){
    if (e.which == 13) {
      e.preventDefault();
      console.log('entered');
      var dataForm = {};
      dataForm['name']='SecretKey'
      dataForm['data'] = $(this).val();
      
      $.ajax({
        type:"POST",
        data:dataForm,
        url:"./php/checkpass.php",
        success:function(data){
          console.log(data);
          if(data=="true"){
            console.log("Logged in successfully");
            $(".login-block input").hide();
            $(".login-block").hide();    
            $(".matric-block").show();
            matricCheck();
          }
          else{ //wrong secret key typed in
            window.location.href='election.html';
          }
        },
        error:function(data){
          console.log("failed logged in");
          window.location.href('election.html');
        }
      });
    }
  });
});

function matricCheck(){
  $(".matric-block input").focus();
  $(".matric-block input").on('keydown', function(e){
    if (e.which == 13) {
      e.preventDefault();
      console.log('entered');
      var dataForm = {};
      dataForm['name']='matricNo'
      dataForm['data'] = $(this).val();
      $.ajax({
        type:"POST",
        data:dataForm,
        url:"./php/checkpass.php",
        success:function(data){
          console.log(data);
          if(data=="1"){
            console.log("Logged in successfully");   
            $(".matric-block").hide();
            $(".voting-block").show();
            submitForm();
          }
          else if(data=='0'){
            console.log('vote before');
            alertmodal('error','系统显示你已经投过票了！');
          }
          else{
            alertmodal('error','系统里并没有你的资料！请向执委们查询。')
          }
        },
        error:function(data){
          console.log("failed logged in");
          alertmodal('error','Login error');
        }
      });
    }
  });
}

function submitForm() {
  var allVoted = 1;

  $( ".btn" ).on("click", function(e) {
    e.preventDefault();
    for(j = 0; j < portfolios.length; j++) {
      value = portfolios[j];
      if(value != "") {
        if($(".choice[name=" + value + "] img[c=true]").size() == maxNo[value]) {
          //console.log('all');
          selection[value] = $(".choice[name=" + value + "] img[c=true]").parent().map(function(){return $(this).attr("value");}).get().join(",");
          //for(i = $(".choice[name=" + value + "] img[c=true]").size(); i < maxNo[value]; i++) selection[value] += ",弃权";
        }
        else {
          //console.log('this');
          allVoted = 0;
        }
      }
      console.log(value,' allVoted:', allVoted);
    }

    

    if(allVoted == 1){
      $.ajax({
        type:"POST",
        data:selection,
        url:"./php/updatedb.php",
        success:function(data){
          console.log("Success");
          console.log(data);
          $(".confirm-success.confirm-jump").show().addClass("bounceInDown");
          setTimeout(function(){
            window.scrollTo(0,0);
            console.clear();
            location.reload(true);},2000);
        },
        error:function(data){
          console.log("Error");
          console.log(data);
          $(".confirm-error.confirm-jump").show().addClass("bounceInDown");
          setTimeout(function(){
            window.scrollTo(0,0);
            console.clear();
            location.reload(true);},2000);
        }
      }); 
    }

    else{
      alertmodal('error','你尚有未选择的人选。本次投票不允许有废票！');
      allVoted = 1;
    }
    
  });
}

//hashcode

hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

//logic for image choice

$(".choice img").on("click", function() {
  $(".choice[name=" + $(this).parent().attr("name") + "] img[c=false]").parent().removeClass("disabled");

  var currentlySelected = $(".choice[name=" + $(this).parent().attr("name") + "] img[c=true]").size();

  if(currentlySelected < maxNo[$(this).parent().attr("name")]) {
    if($(this).attr("c") == "false") {
      $(this).attr("c", "true");

      if(currentlySelected == maxNo[$(this).parent().attr("name")] - 1) {
        $(".choice[name=" + $(this).parent().attr("name") + "] img[c=false]").parent().addClass("disabled");
      }
    } 
    else {
      $(this).attr("c", "false");
    }
  } 

  else if($(this).attr("c") == "true") {
    $(this).attr("c", "false");
  } 

  else {
    $(".choice[name=" + $(this).parent().attr("name") + "] img[c=false]").parent().addClass("disabled");
  }
});