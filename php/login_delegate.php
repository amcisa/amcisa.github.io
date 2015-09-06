<?php
  //login_delegate.php
  require "/secure/checkuser.php";
  if($_POST["action"]=="checkuser"){
    echo(checkUserExists($_POST["MatricNo"]));
  }
?>