<?php
    //Note that client side code only allows submissions if the code is loaded.
    //echo $_FILES['shirt']['error']; //Get the file upload status
    
    //Add a timestamp to the files so that they remain unique submissions
    //maybe use GUID in the future?
    
    $old_dir="/home/amcisaor/public_html/gh/uploads/" . $_FILES["shirt"]["name"];
    
    //This line below is kept for testing on computer
    //$old_dir="C:/wamp/www/amcisa.github.io/uploads/" . $_FILES["shirt"]["name"];

    $timestamp=date("Ymd_Gis");
    $imageFileType = pathinfo($old_dir,PATHINFO_EXTENSION);


    if($imageFileType =='jpg' || $imageFileType =='JPG' ){
       $target_dir= "/home/amcisaor/public_html/gh/uploads/".$timestamp."_".$_FILES["shirt"]["name"];

       //This line below is kept for testing on computer
       //$target_dir= "C:/wamp/www/amcisa.github.io/uploads/".$timestamp."_".$_FILES["shirt"]["name"];
       if (move_uploaded_file($_FILES["shirt"]["tmp_name"], $target_dir)) {
        echo 0;
      
      } else {
        //Error status '01' means upload failed
        echo 1;
      }
    }
    
    else{
       //Error status '09' means wrong file type, but successful upload
       echo 9;
    }
?>