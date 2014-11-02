function scrollToElement(ele) {
    $('html,body').animate({scrollTop: ele.offset().top-50, duration:300}).clearQueue();
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
    var parent=$(this).parentsUntil(".container");
    $(".qa-panel-container").insertBefore(parent[parent.length-1]);
    $(".qa-panel").fadeOut(function() {
      $(this).html(html);
    }).fadeIn();
    scrollToElement($(".qa-panel"));
  });
}