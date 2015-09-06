<?php
  //login_delegate.php
  require $_SERVER['DOCUMENT_ROOT']."/../secure/checkuser.php";
  if($_POST["action"]=="checkuser"){
    echo(checkUserExists($_POST["Matric_NO"]));
  }
?>