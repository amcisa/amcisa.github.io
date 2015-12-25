<?php
    //Note that client side code only allows submissions if the code is loaded.
    //echo $_FILES['shirt']['error']; //Get the file upload status
    
    //Add a timestamp to the files so that they remain unique submissions
    //maybe use GUID in the future?
    session_start();

    require $_SERVER['DOCUMENT_ROOT']."secure/login_rpc.php";

    $results= queryDB("SELECT * FROM `memberlist` WHERE Matric_NO=\"".$_SESSION["matricnum"]."\"");

    $dir= "/home/amcisaor/public_html/gh/uploads/". $results["Name_CH"];
    
    //This line below is kept for testing on computer
    //dir = "C:/wamp/www/amcisa.github.io/uploads/" . $results["Name_EN"];
    $old_dir = $dir .'/'.$_FILES["shirt"]["name"];

    if (!(file_exists($dir))){
      mkdir($dir);
    } 

    $timestamp=date("Ymd_Gis");
    $imageFileType = pathinfo($old_dir,PATHINFO_EXTENSION);


    if($imageFileType =='jpg' || $imageFileType =='JPG' ){
       $target_dir= $dir .'/'.$timestamp."_".$_FILES["shirt"]["name"];

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