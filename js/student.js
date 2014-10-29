function scrollToElement(ele) {
    $('html,body').animate({scrollTop: ele.offset().top-50, duration: 350}).clearQueue();
    return false;
}
function echo(){
  console.log(arguments);
}
//Start button redirection here
$(document).ready(function(){
  redirectUp();
  return false;
})

function redirectUp(){
  $(".qa-li>h3").click(function(){
    var html =  "<h3>Q : "+$(this).find($(":not(i)")).html()
                +"</h3>\n<h3>A : </h3>"+$(this).next().html()+"<br>";
    echo(html);    
    $(".qa-panel").html(html).hide().slideToggle();
    scrollToElement($(".qa-panel"));
  });
}