<?php
  //login_delegate.php
  session_start();
  //require "/home/amcisaor/secure/admin_rpc.php";
  require $_SERVER['DOCUMENT_ROOT']."/secure/admin_rpc.php";
  //print_r(session_id());
  if($_POST["action"]=="CHECKIFADMIN"){
    print_r(checkAdminStatus());
  }elseif($_POST["action"]=="GETALLUSEREMAILS"){
    print_r(returnAllUserEmails());
  }
?>