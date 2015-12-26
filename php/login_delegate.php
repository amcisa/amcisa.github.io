<?php
  //login_delegate.php
  session_start();
  //note when deploying require "/home/amcisaor/secure/login_rpc.php";
  require $_SERVER['DOCUMENT_ROOT']."secure/login_rpc.php";
  //print_r(session_id());
  if($_POST["action"]=="LOGIN"){
    print_r(checkUserExists($_POST["Matric_NO"], $_POST["Password"]));
  }elseif($_POST["action"]=="CHECKLOGINSTATUS"){
    print_r(checkLoginStatus());
  }elseif($_POST["action"]=="LOGOUT"){
    print_r(signOutFromSession());
  }elseif($_POST["action"]=="UPDATEINFO"){
    //REMINDER TO SUBMIT TO DB TO UPDATE 
    //REMINDER TO ESCAPE ALL CHARACTERS
    print_r(updateUserInfo(dissoc($_POST,"action")));
    
  }elseif($_POST["action"]=="READUSERNAME_EN"){
    print_r(returnUserNameEnglish());
  }elseif($_POST["action"]=="READUSERNAME_CH"){
    print_r(returnUserNameChinese());
  }
?>