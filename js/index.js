function scrollToElement(ele) {
    $('html,body').animate({scrollTop: ele.offset().top-50, duration: 350}).clearQueue();
    return false;
}
function echo(){
  console.log(arguments);
}

//Start button redirection here
$(window).load(function(){
  pageScrollTo("events");
  pageScrollTo("services");
  pageScrollTo("poster");
  return false;
})

function pageScrollTo(name){
  $("."+name+"-btn").click(function(){
    scrollToElement($("#"+name+"-label"));
    return false;
  })
}