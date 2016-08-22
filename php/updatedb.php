<?php
    //Get the database
      //$db = new mysqli("localhost", "amcisaor", "1pleasing2sitter3likely", "amcisaor_amcisa");
      $db= new mysqli ("localhost", "gudgud", "gudgud", "amcisaor_amcisa");
      if($db->connect_error) die('Database connection error: ' . $db->connect_error);
      $db->set_charset("utf8");
      print_r($_POST);
      $sql = "INSERT INTO `ntuelection2016`(`会长`,`副会长`, `秘书`, `财政`, `节策`, `编辑`, `总务`, `网持`) VALUES ('".$_POST["President"]."','".$_POST["VicePresident"]."','".$_POST["Secretary"]."','".$_POST["Treasurer"]."','".$_POST["Programmer"]."','".$_POST["Editor"]."','".$_POST["Log"]."','".$_POST["Webdev"]."')";
      print_r($sql);
      $results= $db->query($sql);      
      $db->close();
    
?>