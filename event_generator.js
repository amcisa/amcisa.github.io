const fs = require('fs');
const path = require('path');
const rls = require('readline-sync');
const replace = require('stream-replace');


if(!fs.existsSync("../event/event_year.post")){
  console.log("Template not found! Please copy it from the repo at https://github.com/amcisa/event.")
  return false;
}
data=getData(); 
copyFiles(data[1]+"."+data[2],"events\\"+data[0]);

function copyFiles(prefix, outputdir, defaultname, defaultdir){
  defaultname = typeof defaultname !== 'undefined' ? defaultname : "org.event";
  defaultdir = typeof defaultdir !== 'undefined' ? defaultdir : "..\\event\\event_year.post";
  if(!fs.existsSync(outputdir)){
    fs.mkdirSync(outputdir);
  }
  fs.readdirSync(defaultdir).filter(function(file) {
    return fs.statSync(path.join(defaultdir, file)).isFile();
  }).forEach(function(f){
    inputfile=defaultdir+"\\"+f;
    outputfile=outputdir+"\\"+f.replace(defaultname, prefix);
    //Replace all org.event by prefix.eventname before copying it to the destination folder
    fs.createReadStream(inputfile)
      .pipe(replace(defaultname, prefix))
      .pipe(fs.createWriteStream(outputfile));
    console.log(outputfile+" is created.");
  });
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

