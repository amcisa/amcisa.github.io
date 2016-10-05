var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
var config = {
    username: "amcisaor",
    password: "4fetch5probable6archer", // optional, prompted if none given 
    host: "amcisa.org",
    port: 21,
    localRoot: __dirname,
    remoteRoot: "/public_html/gh/",
    exclude: ['.git', '.idea', 'tmp/*','node_modules'],
    continueOnError : true
}
    
console.log("Start");
ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});

ftpDeploy.on('uploading', function(data) {
    //data.totalFileCount;       // total file count being transferred
    //data.transferredFileCount; // number of files transferred
    //data.percentComplete;      // percent as a number 1 - 100
    //data.filename;             // partial path with filename being uploaded
    console.log(data)
});

ftpDeploy.on('upload-error', function (data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});