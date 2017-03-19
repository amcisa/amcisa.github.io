$(document).ready(function(){
  //Poll for session data
  rpc(
    "php/login_delegate.php",
    {
      "action":"CHECKLOGINSTATUS"
    },
    function(data){
        //use login_iframe in util.js
        console.log('here');
        login_iframe(data);
        }

    )
    
    $("form").submit(function(e){e.preventDefault();runRPC();});
    
})


//This line below should be activated to test this submission system without the login system
//$("form").submit(function(e){e.preventDefault();runRPC();});

function sanitise(string){
    //trivial sanitising function, not for serious use
    return string.replace(/[&\/\\#,+()$~%.:*?<>{}\s+]/g,'_');
}

function runRPC(status){
    console.log('running rpc')
    var emptyEle = [];

    //Refresh state
    $('.MyName').removeClass('has-error');
    $('.NomPrize').removeClass('has-error');
    $('.Name').removeClass('has-error');
    $('.Caption').removeClass('has-error');
    $('.Image').removeClass('has-error');

    function checkEmptyInput(elementname, errorvalue) {
        var target = $("."+ elementname + " .col-lg-10");
        console.log(target.first().val());
        if (target.children().first().val() == "") {
            target.addClass('has-error');
            emptyEle.push(errorvalue);
        } 
    }
    checkEmptyInput('MyName', '提名人姓名');
    checkEmptyInput('NomPrize', '提名奖项');
    checkEmptyInput('Name', '被提名者');
    checkEmptyInput('Caption', '提名理由');
    if (($('.Image')[0]).files[0] == undefined)
        emptyEle.push('上传照片');


    console.log(emptyEle);

     //get the first file only
    
    //done all error checking and start file uploading

    $('#loading').removeClass('hide');
    $(".fa.fa-fw.fa-circle-o-notch.fa-spin").removeClass('hide');

    if (emptyEle.length == 0) {
        this.value = 'Uploading..';

        //initialise all variables
        var MyName_val=sanitise($('.MyName .col-lg-10').children().first().val());
        var NomPrize_val = sanitise($('.NomPrize .col-lg-10').children().first().val());
        var Name_val=sanitise($('.Name .col-lg-10').children().first().val());
        var Caption_val=$('.Caption .col-lg-10').children().first().val();
        var file = ($('.Image')[0]).files[0];

        var filename = $('.Image').val().split(".");
        console.log(filename);
        var fileExt = filename[filename.length - 1].toLowerCase();
        console.log(fileExt);
                    
        //File name in the server        
        var fileUpload = NomPrize_val + '_' + Name_val + '_' + MyName_val + "." + fileExt;
        console.log(fileUpload);

        if(!file){
            try{
                file=new Blob([file_upload], {type : 'text/plain'});
            }catch(e){
                window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                var bb = new BlobBuilder();
                bb.append(file_upload);
                file = bb.getBlob('text/plain');
            }
            
        }

        //Prepares the data for transmission
        var data = new FormData();       
        data.append('nominate', file, fileUpload);
        data.append('caption', Caption_val);

        console.log(data);
            
        $.ajax({
            url: 'php/amscar_upload.php',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(status) {
                console.log('Success');
                console.log(status);
                $('#loading').addClass('hide');

                if (status == 0) {
                    console.log('successfully uploaded');
                    write_to_db(MyName_val,NomPrize_val,Name_val,Caption_val);
                    window.location.href="amscarRedirect.html";
                } else {
                    alertmodal("error","不好意思，提名失！请联络网持以协助您。");
                    $("span").html("重新提交");
                    $(".col-lg-10 i").addClass('hide');
                    }
                },
            error: function(xhr, status, error) {
                console.log(status);
                $('#loading').addClass('hide');
                alertmodal("error","不好意思，提名失败！请联络网持以协助您。" + error);
                $("span").html("重新提交");
                $(".col-lg-10 i").addClass('hide');
            }

        });
    } 

    else {
        $('#loading').addClass('hide');

        alertmodal("error","请将所有的资料填妥完整。谢谢！");
        $("span").html("重新提交");
        $(".col-lg-10 i").addClass('hide');
    }

}

function write_to_db(MyName_val,NomPrize_val,Name_val,Caption_val){
    var nomination = {};
    nomination["Nominator"] = MyName_val;
    nomination["Prize"] = NomPrize_val;
    nomination["Nominee"] = Name_val;
    nomination["Caption"] = Caption_val;

    console.log(nomination);
    $.ajax({
      type:"POST",
      data:nomination,
      url:"./php/amscarDB.php",
      success:function(data){
        console.log("Success");
      },
      error:function(data){
        console.log("Error");
        console.log(data);
      }
    });
}
