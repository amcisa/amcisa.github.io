<?php
    //Get the database
      //$db = new mysqli("localhost", "amcisaor", "1pleasing2sitter3likely", "amcisaor_amcisa");

      $username = key($_POST["selection"]);
      $keyList = array_keys($_POST["selection"][$username]);
      
      foreach($keyList as $prize){
        $nomination = $_POST["selection"][$username][$prize];
        for($i=0;$i<count($nomination);$i++){
          $selection = $nomination[$i];
          print_r($prize.key($selection).$selection[key($selection)]);
        }
        
      }
      /*
      $db= new mysqli ("localhost", "gudgud", "gudgud", "amcisaor_amcisa");
      // Check connection
      if (mysqli_connect_errno()){
          echo 'Database connection error: ' . mysqli_connect_error();
          exit();
      }
      $db->set_charset("utf8");

      //check whether user voted before. Grant access only to first time voters
      $sql = "SELECT * FROM `amteevoting` WHERE Username = '".$_POST["Username"]."'";
      $exist = $db -> query($sql);

      if (mysqli_num_rows($exist) == 0){
        print_r (1); //successful vote
        $sql = "INSERT INTO `amteevoting`(`Username`,`Vote`) VALUES ('".$_POST["Username"]."','".$_POST["Vote"]."')";
        $results= $db->query($sql);      
      }

      else{
        print_r (-1); //cannot vote duplicate
      }
      
      $db->close();*/
      
    
    
?>