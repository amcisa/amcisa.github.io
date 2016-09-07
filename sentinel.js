const watch = require('watch');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

//Edit here if you have other templates to generate. For example coffee-script
const watched_ext={
  jade:["jade", "pug"],
  styl:["styl"]
};

console.log("Sentinel initialised.")

//Process command line arguments here
// -a : refresh all templates
// -e : exit command. Place this last to complete other commands first.
const cmd_args=process.argv.slice(2);
if(cmd_args[0]=="-a"){
  console.log("Sentinel started. Begin refreshing all templates.")
  refresh_allfiles();
  console.log("All templates refreshed.")
}
if(cmd_args[1]=="-e"){
  process.exit(0);
}

//Main monitoring block
watch.createMonitor('.',function(monitor){
  console.log("Sentinel started. File edits are watched.")
  monitor.on("created", function(f, stat){
    refresh_files(f);
  })
  monitor.on("changed", function(f, stat){
    refresh_files(f);
  })
})

function refresh_allfiles(){
  //Common usage : cp.execSync(["command"],{cwd:".\\",stdio: 'inherit'})
  cp.execSync(["node_modules\\.bin\\jade -P .\\post --out .\\"],{cwd:".\\",stdio: 'inherit'})
  fs.readdirSync(".\\events")
    .filter(function(f) {
      return f.match(/\.post/i);
    }).forEach(function(f){
      var d=".\\events\\"+f.split(".")[0];
      if(!fs.existsSync(d)){
        fs.mkdirSync(d);
      }
      cp.execSync(["node_modules\\.bin\\jade -P .\\events\\"+f+" --out "+d],{cwd:".\\",stdio: 'inherit'});
  });
  cp.execSync(["stylus .\\css"],{cwd:".\\",stdio: 'inherit'});
}

function generate_file_data(filepath){
  //Take note of the sequence where data is processed.
  filedata={
    input: filepath,
    dirname: path.dirname(filepath),
    filename: path.basename(filepath),
    extname: path.extname(filepath).slice(1),
    output:".\\",
    render: true
  };
  //For events which have the format -> ./events/YY-YY.{post|includes}
  if(filepath.match(/\d\d-\d\d/i)){
    filedata.output=".\\"+filedata.dirname.split(".")[0];
  }
  //For any includes folder. Refresh the whole folder
  if(filepath.match(/includes/i)){
    filedata.input=filedata.output+".post"
  }
  if(filepath.match(/css/i)){
    filedata.output=filedata.dirname;
  }
  return filedata;
}

function refresh_files(f){
  var filedata=generate_file_data(f);
  var render_type= findExtInChildren(filedata.extname, watched_ext);
  if(render_type=="jade"){
    generic_generator(filedata,"html","node_modules\\.bin\\jade -P");
  }else if(render_type=="styl"){
    generic_generator(filedata,"css","stylus");
  }
}


function generic_generator(fd, output_ext, starting_cmd){
  tempname=fd.output+"\\"+fd.filename.replace(/\.[^/.]+$/, "")+"."+output_ext;
  if(fs.existsSync(tempname)){
    fs.unlinkSync(tempname);
    console.log("Old version : "+tempname+" found and removed.");
  }else{
    console.log("Old version : "+tempname+" not found.");
  }  
  console.log("Creating new file from "+fd.input+" in : "+fd.output);
  cp.execSync([starting_cmd+" "+fd.input+" --out "+fd.output],{cwd:".\\",stdio: 'inherit'});
}

function findExtInChildren(extension, watched_extensions){
  for (extension_type in watched_extensions){
    if(watched_extensions[extension_type].indexOf(extension)!=-1){
      return extension_type;
    }
  }
  return false;
}