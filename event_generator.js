const fs = require('fs');
const path = require('path');
const rls = require('readline-sync');

function templateAvailable(){
  return fs.existsSync("../event/event_year.post")
}

function copyFiles(prefix, outputdir, defaultname, defaultdir){
  defaultname = typeof defaultname !== 'undefined' ? defaultname : "org.event";
  defaultdir = typeof defaultdir !== 'undefined' ? defaultdir : "../event/event_year.post";
}

function getData(cmd_args){
  cmd_args = typeof cmd_args !== 'undefined' ? cmd_args : process.argv.slice(2);
  var data=["","",""];
  //If there is not enough data in the command line arguments, manual input is needed.
  if(cmd_args.length!=3){
    cmd_args[0]=rls.question("Which academic year? Example format: 14-15....>")
    cmd_args[1]=rls.question("Which organisation? Enter number. Amcisa[0],NTU[1],NUS[2]....>");
    cmd_args[2]=rls.question("Enter event initials. Example: mygather ....>");
  }
  if(!cmd_args[0].match(/\d\d-\d\d/)){
    console.log("The format for the first argument is YY-YY!");
    return getData([""]);
  }else{
    data[0]=cmd_args[0]+".post";
  }
  if(!cmd_args[1].match(/0|1|2/)){
    console.log("Amcisa[0],NTU[1],NUS[2]. Only numbers are accepted.");
    return getData([""]);
  }else{
    orgType=["amc","ntu","nus"];
    data[1]=orgType[cmd_args[1]];
  }
  data[2]=cmd_args[2]
  return data;
}

function main(){

  if(!templateAvailable()){
    console.log("Template not found! Please copy it from the repo.")
    //return false;
    console.log(getData());
  }

  



}

main();
rls.question("Press Enter to exit");