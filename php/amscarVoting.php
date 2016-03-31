<?php
    //Get the database
      $db = new mysqli("localhost", "amcisaor", "1pleasing2sitter3likely", "amcisaor_amcisa");
      //$db= new mysqli ("localhost", "gudgud", "gudgud", "amcisaor_amcisa");
      // Check connection
      if (mysqli_connect_errno()){
          echo 'Database connection error: ' . mysqli_connect_error();
          exit();
      }
      $db->set_charset("utf8");

      //parsing data received
      $username = key($_POST["selection"]);
      $keyList = array_keys($_POST["selection"][$username]);
      $sql = "SELECT * FROM `amscarvoter` WHERE Username = '".$username."'";
      $exist = $db -> query($sql);

      if (mysqli_num_rows($exist) == 0){
        $sql = "INSERT INTO `amscarvoter`(`Username`) VALUES ('".$username."')";
        $results= $db->query($sql);      
        
        foreach($keyList as $prize){
          $nomination = $_POST["selection"][$username][$prize];
          for($i=0;$i<count($nomination);$i++){
            $selection = $nomination[$i];
            $nominee = key($selection);
            $vote = $selection[$nominee];
            $sql = "SELECT Vote FROM `amscarresult2016` WHERE `Prize` = '".$prize."' and `Nominee` = '".$nominee."'";
            $results= $db->query($sql);
            $currentVote = $results->fetch_row();
            $currentVote = $vote + $currentVote[0];
            $sql = "UPDATE `amscarresult2016` SET Vote = ".$currentVote." WHERE `Prize` = '".$prize."' and `Nominee` = '".$nominee."'";
            //print_r($sql);
            $db->query($sql);  
          }
        }
        print_r (1); //successful vote

        $db->close();
      }
      
      else{
        print_r (-1); //cannot vote duplicate
        $db->close();
      }
      
    
    
?>