$(document).ready(function(){
  SecretKey="";
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
        url:"php/checkpass.php",
        success:function(data){
          console.log(data);
          if(data=="true"){
            console.log("Logged in successfully");
            $(".login-block input").hide();
            $(".login-block").hide();    
            $(".matric-block").show();
            getResults();
          }
          else{ //wrong secret key typed in
            window.location.href='electionResult.html';
          }
        },
        error:function(data){
          console.log("failed logged in");
          window.location.href='electionResult.html';
        }
      });
    }
  });
});

function getResults(){
  $.ajax({
    type:"GET",
    url:"php/countvote.php",
    processData:false,
    contentType:false,
    success:function(data){
      console.log(data);
      data=JSON.parse(data);
      //console.log(getPercentages(data['会长']));
      $(".results-block").append(visualiseData(data, '会长'));
      $(".results-block").append(visualiseData(data,'副会长'));
      $(".results-block").append(visualiseData(data,'秘书'));
      $(".results-block").append(visualiseData(data,'财政'));
      $(".results-block").append(visualiseData(data,'节策'));
      $(".results-block").append(visualiseData(data,'编辑'));
      $(".results-block").append(visualiseData(data,'总务'));
      $(".results-block").append(visualiseData(data,'网持'));
    }
  })
}

hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

function sumObjKeys (obj){
  sum=0;
  for(var key in obj){
    sum+=obj[key];
  }
  return sum;
}

function getPercentages(obj){
  var sum=sumObjKeys(obj);
  var temp={};
  for(var key in obj){
    temp[key]=(Math.round((obj[key]/sum)*10000))/100;
  }
  return temp;
}

function visualiseData(obj,key){
  var html='<div><br/><h1>'+key+'</h1>';
  obj=obj[key];
  var types=['primary', 'success', 'warning', 'danger', 'info'];
  var counter=0;
  var percented=getPercentages(obj);
  for(var key in percented){
    console.log(key);
    if(key != "弃权") {
      var styletype= key!="弃权" ? types[counter] : "default";
      html+='<div class="progress">';
      html+='<div class="col-sm-4 text-center"><h3>'+key+'</h3></div>';
      html+='<div class="col-sm-8"><div class="text-center progress-bar progress-bar-'+styletype+'" style="width:'+percented[key]+'%"><h5><br/>'+obj[key]+'票<br/>'+percented[key]  +'%</h5></div></div><br/>';
      html+='</div>';
      counter ++ ;
      counter=counter % types.length;
    }
  }
  html+='</div></div>';
  return html;
}