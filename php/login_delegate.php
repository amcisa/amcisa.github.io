<?php
  //login_delegate.php
  session_start();
  require $_SERVER['DOCUMENT_ROOT']."secure/login_rpc.php";
  //print_r(session_id());
  if($_POST["action"]=="LOGIN"){
    print_r(checkUserExists($_POST["Matric_NO"], $_POST["Password"]));
  }
?>