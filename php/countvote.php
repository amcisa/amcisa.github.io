<?php
    //$db = new mysqli("localhost", "amcisaor", "1pleasing2sitter3likely", "amcisaor_amcisa");
    $db= new mysqli ("localhost", "gudgud", "gudgud", "amcisaor_amcisa");
    if($db->connect_error) die('Database connection error: ' . $db->connect_error);
    $db->set_charset("utf8");
    
    $sql = "SELECT * FROM `ntuelection2016`";
    $results= $db->query($sql);
    $dict=array("会长"=>array(),
            "副会长"=>array(),
            "秘书"=>array(),
            "财政"=>array(),
            "节策"=>array(),
            "编辑"=>array(),
            "总务"=>array(),
            "网持"=>array());
    for($i =0; $i<mysqli_num_rows($results); $i++){        
        $row = $results->fetch_assoc();
        //echo $row;
        foreach($row as $key => $vals){
            $vals = explode(",",$vals);
            //echo $vals;
            foreach($vals as $val) {
                if(array_key_exists($val, $dict[$key])){
                    $dict[$key][$val]+=1;
                }else{
                    $dict[$key][$val]=1;
                }      
            }
        }
    }

    //echo "<pre>" . print_r($dict, true) . "</pre>";
    //print_r($dict);
    //echo array_sum($dict);
    echo json_encode($dict);
    //echo json_encode($errors);
    $db->close();
?>