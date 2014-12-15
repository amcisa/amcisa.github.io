//Start button redirection here
$(document).ready(function(){
  redirectUp();
  return false;
})

function redirectUp(){
  $(".qa-li>h3").click(function(){
    var html =  "<h3>Q : "+$(this).find($(":not(i)")).html()
                +"</h3>\n<h3>A : </h3>"+$(this).next().html()+"<br>";
    var parent=$(this).parentsUntil(".qa-out");
    console.log(parent);
    $(".qa-panel-container").insertBefore(parent[parent.length-1]);
    scrollToElement($(".qa-panel"));
    $(".qa-panel").html(html);
  });
}