/*
Window scrolling functions, so the user don't have to scroll so much
Set to use section class. 
Author: Daniel Tan (02/10/14)
*/
var main={
  anchorArr:["section"],
  minWidth:992 //this is set in the css
};
$(document).ready(function(){
  var scroll =0;
  var anchor=findAnchor(main.anchorArr);
  var offset=0;
  var movement;
  function scrollNext(e){
    if(e.originalEvent.wheelDelta){
      movement=e.originalEvent.wheelDelta-offset <0 ? 1 : -1;
    }else{
      movement=e.originalEvent.deltaY-offset>0 ? 1 : -1;
    }
    //console.log(movement);
    scroll=clamp(scroll+movement,0,anchor.length-1);
    //console.log(anchor[scroll].attr('class'));
    scrollToElement(anchor[scroll]);
  }

  //only use auto scroll when width is right
  var controlele="."+main.anchorArr.join(", .");
  var minwidth=main.minWidth; 
  //console.log(minwidth);
  var curwidth=$(controlele).width();
  $(window).resize(function(){
    curwidth=$(controlele).width();
  });

  //No support for firefox 

  $('body').bind('wheel mousewheel', function(e){
    if (curwidth>=minwidth ){
      scrollNext(e);
      //console.log("No prob");
      return false;
    }
  });
});
function findAnchor(jumpToArr){
  //Support for multiple class anchor
  var dir=[];
  $("."+jumpToArr.join(", .")).
    each(function(){
      dir.push($(this));
    });
  return dir;
}
function scrollToElement(ele) {
    $('html,body').animate({scrollTop: ele.offset().top-50, duration: 300}).clearQueue();
}
function clamp(arg,start,end){
  if(arg<start){
    return start;
  }else if (arg>end){
    return end;
  }else{
    return arg;
  }
}