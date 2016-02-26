<?php
    $db = new mysqli("localhost", "amcisaor", "1pleasing2sitter3likely", "amcisaor_amcisa");
    //$db= new mysqli ("localhost", "gudgud", "gudgud", "amcisaor_amcisa");
    if($db->connect_error) die('Database connection error: ' . $db->connect_error);
    $db->set_charset("utf8");
    
    $sql = "SELECT Vote FROM `amteevoting`";
    $result= $db->query($sql);
    $dict=array("AMTEE唯我第一"=>0,
            "1"=>0,
            "2(1)"=>0,
            "2(2)"=>0,
            "3"=>0,
            "AMTEE"=>0,
            "Am服服"=>0);
    $rows = [];
    while($row = mysqli_fetch_array($result)){
        $rows[] = $row;
    }
    for ($i=0;$i<mysqli_num_rows($result);$i++){
        if (array_key_exists($rows[$i]['Vote'], $dict)){
            $dict[$rows[$i]['Vote']] += 1;
        }
    }
    //echo "<pre>" . print_r($dict, true) . "</pre>";
    //print_r($dict);
    //echo array_sum($dict);
    echo json_encode($dict);
    //echo json_encode($errors);
    $db->close();
?>