/*
Window scrolling functions, so the user don't have to scroll so much
Set to use section class. 
Author: Daniel Tan (02/10/14)
*/
//State memory
var main={
  anchorArr:["section"],
  scroll:0,
  anchorList:[],
  minWidth:992 
};

//Main function
$(document).ready(function(){
  main.anchorList=findClass(main.anchorArr); 
  mousePageScroll(main);  
});

function mouseScrollNext(e, state){
  //For mouse scroll movements
  movement = e.originalEvent.wheelDelta ? 
            (e.originalEvent.wheelDelta<0 ? 1 : -1) :
            (e.originalEvent.deltaY>0 ? 1 : -1)
  state.scroll=clamp(state.scroll+movement,0,state.anchorList.length-1);
  scrollToElement(state.anchorList[state.scroll]);
}
function mousePageScroll(state){ 
  //only use auto scroll when width is right
  var curwidth=state.anchorList[0].width();
  $(window).resize(function(){
    curwidth=state.anchorList[0].width();
  });
  $('body').bind('wheel mousewheel', function(e){
    if (curwidth>=state.minWidth){
      mouseScrollNext(e,state);
      return false;
    }
  });
}
function findClass(jumpToArr){
  //Array wrapper for JQuery class selector
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
  return arg<start ? start : (arg>end ? end : arg);
}

function echo(){
  console.log(arguments);
}