<?php

if(isset($_POST['submit']))
{
    $file=$_FILES['file'];
    $fileName = $_FILES['file']['name'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileSize = $_FILES['file']['size'];
    $fileError = $_FILES['file']['error'];
    $fileType = $_FILES['file']['type'];
    $name = $_POST['name'];
    $matric = $_POST['matric'];

    $fileExt = explode('.',$fileName);
    $fileActualExt = strtolower(end($fileExt));
    $allowed = array('jpeg','jpg','bmp','pdf','psd','png','ai','ait','gif');

    if(in_array($fileActualExt,$allowed))
    {
        if($fileError === 0)
        {
            if($fileSize < 1000*1000*10 )
            {
                $fileNameNew = $matric.".".$name.".".$fileActualExt;
                $fileDestination = "../uploads/amtee2017/".$fileNameNew;
                move_uploaded_file($fileTmpName,$fileDestination);
                echo "Your design has been uploaded!";
            }
            else echo "File size cannot larger than 10MB";
        }
        else echo "There was an error. Please contact us via amcisa.comm@gmail.com";
    }else
    {
        echo "Only these format are allowed: jpeg, jpg, bmp, pdf, psd, png, ai, ait, gif.";
    }
    
}
?>