$(document).ready(function(){
  //Poll for session data
  rpc(
    "php/login_delegate.php",
    {
      "action":"CHECKLOGINSTATUS"
    },
    function(data){
        if(data==0){
            console.log('Not login yet');
            
            $('#login_frame').removeClass('hide');
            $('.wrapper').addClass('hide');

            $(".alert-tab strong").html("You have not successfully login in. Please login to continue.");
            $(".alert-tab").removeClass("hide");

            //$('#login_frame').contents().find('button').click(function() {
                //console.log('button pressed')
                //window.top.location.reload();
            
            //});

            $('#login_frame').load(function(){
                var iframe = $('#login_frame').contents();
                iframe.find('.go').click(function(e){
                    rpc(
                    "php/login_delegate.php",
                    {
                      "action":"CHECKLOGINSTATUS"
                    },function(data){
                        if(data!=0){
                            window.top.location.reload();
                        }
                    });
                });
            });

            }
        
        else{
            $('#login_frame').addClass('hide');
            $('.wrapper').removeClass('hide');
            }
        }

    )
    
    $("form").submit(function(e){e.preventDefault();runRPC();});
    
})


//This line below should be activated to test this submission system without the login system
//$("form").submit(function(e){e.preventDefault();runRPC();});


function showImages(){
    rpc(
        "php/login_delegate.php",
        {
          //"action":"READUSERNAME_EN"
          "action":"READUSERNAME_CH"
        },
        function(data){
            var dir = "uploads/" + data;
            console.log(dir);
            var fileextension = ".jpg";
            $.ajax({
                //This will retrieve the contents of the folder if the folder is configured as 'browsable'
                url: dir,
                success: function (data) {
                    //List all .jpg file names in the page
                    console.log('success show images');
                    $("#img_row").empty();
                    $(data).find("a").attr("href", function (i, val) {
                        if(val.match(/\.jpg/) ) { 
                            $("#img_row").append("<img src='" + dir + '/' + val + "'>");
                            $("#img_row").append("<p> 作品名称与作者：" + val.slice(15,-4) + "</p>");
                            $("#img_row").append("<p> 上传日期：" + val.slice(0,8) + "</p>");
                            console.log('here');
                        }
                
                    });
                },
                error: function(data){
                    //Not browsable means that there is not upload event before
                    $("#img_row").empty();
                    $("#img_row").append("<h2> 你还未上传任何作品。期待您的杰作！</h2>");
                }
            });

        })

}

function sanitise(string){
    //trivial sanitising function, not for serious use
    return string.replace(/[ &\/\\#,+()$~%.:*?<>{}\s+]/g,'_');
}

function runRPC(status) {
    console.log('running rpc')
    var emptyEle = [];
    
    this.value="Processing...";

    $(".col-lg-10.col-lg-offset-2.submit i").removeClass('hide');

    //Refresh state
    $('.Group_Name').removeClass('has-error');
    $('.Name').removeClass('has-error');
    $('.Email').removeClass('has-error');
    $('.Shirt_Image').removeClass('has-error');

    //Standard error checking code
    //function checkEmptyInput(elementname, errorvalue) {
        //if (document.getElementById(elementname).value == "") {
            //$(elementname).addClass('has-error');
            //emptyEle.push(errorvalue);
        //}
    //}

    function checkEmptyInput(elementname, errorvalue) {
        var target = $("."+ elementname + " .col-lg-10");
        console.log(target.children().first().val());
        if (target.children().first().val() == "") {
            target.addClass('has-error');
            emptyEle.push(errorvalue);
    }
    }
    checkEmptyInput('Group_Name', '作品名称');
    checkEmptyInput('Name', '作者中文姓名');
    checkEmptyInput('Email', 'Email');
    checkEmptyInput('Shirt_Image', "作品上载");

    console.log(emptyEle);

    //Uploads the file if there is no user error
    var groupName_val=sanitise($('.Group_Name .col-lg-10').children().first().val());
    console.log(groupName_val);
    var Name_val=sanitise($('.Name .col-lg-10').children().first().val());
    console.log(Name_val);

    if (!(document.getElementById('checkbox').checked)){
        alertmodal("error","请确保您已经阅读并同意比赛细则。谢谢！");

    }else{
    
    //done all error checking and start file uploading

        $('#loading').removeClass('hide');

        if (emptyEle.length == 0) {
            this.value = 'Uploading..';
            var file = ($('.Shirt_Image')[0]).files[0]; //only one file is uploaded, so get the first file.
            console.log(file);
            var file_name_split = $('.Shirt_Image').val().split(".");
            console.log(file_name_split);
            var file_ext = file_name_split[file_name_split.length - 1].toLowerCase();
            console.log(file_ext);
                        
            //File name in the server        
            var file_upload = groupName_val + "_" +  Name_val + "." + file_ext;
            console.log(file_upload);

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
            data.append('shirt', file, file_upload);

            console.log(data);
                
            $.ajax({
                url: 'php/amtee_upload.php',
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
                        console.log('successfully uploaded')
                        alertmodal("success","上传成功！谢谢您的参与，祝你好运！\n 请点击“我的作品集”浏览自己所上传过的作品。")

                    
                    } else {
                        if(status== 09){
                            alertmodal("error","上传失败！请确保你的上传文件为JPEG格式。");
                            $(".col-lg-10.col-lg-offset-2.submit span").html("重新提交");
                        }else{
                            alertmodal("error","不好意思，上传失败！");
                            $(".col-lg-10.col-lg-offset-2.submit span").html("重新提交");
                        }
                    }
                    $(".col-lg-10.col-lg-offset-2.submit i").addClass('hide');
                },
                error: function(xhr, status, error) {
                    console.log(status);
                    $('#loading').addClass('hide');
                    alertmodal("error","不好意思，上传失败！" + error);
                    $(".col-lg-10.col-lg-offset-2.submit span").html("重新提交");
                    $(".col-lg-10.col-lg-offset-2.submit i").addClass('hide');
                }

            });
        } else {
            $('#loading').addClass('hide');

            alertmodal("error","请将所有的资料填妥完整。谢谢！");
            $(".col-lg-10.col-lg-offset-2.submit span").html("重新提交");
            $(".col-lg-10.col-lg-offset-2.submit i").addClass('hide');
        }
    }
}

