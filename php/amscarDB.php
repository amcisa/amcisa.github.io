<?php
    //Get the database
      $db = new mysqli("localhost", "amcisaor", "4fetch5probable6archer", "amcisaor_amcisa");
      //$db = new mysqli("localhost", "amcisaor", "1pleasing2sitter3likely", "amcisaor_amcisa");
      
      //$db= new mysqli ("localhost", "gudgud", "gudgud", "amcisaor_amcisa");
      // Check connection
      if (mysqli_connect_errno()){
          echo 'Database connection error: ' . mysqli_connect_error();
          exit();
      }
      $db->set_charset("utf8");

      $sql = "INSERT INTO `amscar2017`(`Nominator`,`Prize`,`Nominee`,`Caption`) VALUES (".$_POST["Nominator"].",".$_POST["Prize"].",".$_POST["Nominee"].",".$_POST["Caption"].")";
      $results= $db->query($sql);            
      $db->close();
      
    
    
?>