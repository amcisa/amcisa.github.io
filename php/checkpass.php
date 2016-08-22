<?php
  if($_POST["name"]=="SecretKey"){
    if($_POST["data"]=="1daniel2yisheng"){
      print_r("true");
    }
    else{
      print_r("false");
    } 
  }

  else if ($_POST["name"]=="matricNo"){
    $db= new mysqli ("localhost", "gudgud", "gudgud", "amcisaor_amcisa");
    if (mysqli_connect_errno()){
        echo 'Database connection error: ' . mysqli_connect_error();
        exit();
    }
    $db->set_charset("utf8");
    $matric = $_POST["data"];
    $sql = "SELECT * FROM `memberlist` WHERE Matric_NO = '".$matric."'";
    $exist = $db -> query($sql);
    
    if (mysqli_num_rows($exist) > 0){
      $sql = "SELECT * FROM `election2016voter` WHERE MatricNo = '".$matric."'";
      $voteBefore = $db -> query($sql);
      if (mysqli_num_rows($voteBefore) == 0){
        date_default_timezone_set("Asia/Singapore");
        $time = date("h:i:sa");
        $sql = "INSERT INTO `election2016voter`(`MatricNo`,`Time`) VALUES ('".$matric."', '".$time."')";
        $execute = $db -> query($sql);
        print_r(1);
      }
      else{
        print_r(0); //vote before
      }
    }

    else{
      print_r(-1); //voter does not exist in memberlist
    }          
    $db->close();
  }
  
?>