$(document).ready(function(){
    $.ajax({
      type:"POST",
      url:"./php/amtee_countvote.php",
      success:function(data){
        array = JSON.parse(data);
        console.log(array);
        outputResult(array);
      },
      error:function(data){
        console.log("Error");
        console.log(data);
      }
    });
})

function outputResult(array){
    $('#result1').empty();
    $('#result1').append('<h2>'+array['AMTEE唯我第一']+'</h2>');
    $('#result2').empty();
    $('#result2').append('<h2>'+array['1']+'</h2>');
    $('#result3').empty();
    $('#result3').append('<h2>'+array['2(1)']+'</h2>');
    $('#result4').empty();
    $('#result4').append('<h2>'+array['2(2)']+'</h2>');
    $('#result5').empty();
    $('#result5').append('<h2>'+array['3']+'</h2>');
    $('#result6').empty();
    $('#result6').append('<h2>'+array['AMTEE']+'</h2>');
    $('#result7').empty();
    $('#result7').append('<h2>'+array['Am服服']+'</h2>');
}