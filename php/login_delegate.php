<?php
  //login_delegate.php
  require $_SERVER['DOCUMENT_ROOT']."/../secure/checkuser.php";
  if($_POST["action"]=="checkuser"){
    var_dump($_POST["Matric_NO"]);
    echo(checkUserExists($_POST["Matric_NO"]));
  }
?>