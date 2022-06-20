<?php

require_once ('application/db/DB.php');
$db = new DB();
if (isset($_POST['user_id']) && isset($_POST['name']) && isset($_POST['creation_date'] ) && isset($_POST['advantages'])
        && isset($_POST['disadvantages']) && isset($_POST['grade'])){
            $name = $_FILES['title_image']['name'];
            move_uploaded_file($_FILES['title_image']['tmp_name'], dirname(__FILE__) ."/images/titles/$name");
            $id = $db->addReview($_POST['user_id'], $_POST['name'], $_POST['creation_date'], $_POST['advantages'], 
                $_POST['disadvantages'], $_POST['grade'], $_FILES['title_image']['name']);

            $row = $_POST['row'];
            for ($i = 1; $i <= $row; $i++){
                $name = $_FILES['image'.$row]['name'];
                move_uploaded_file($_FILES['image'.$row]['tmp_name'], dirname(__FILE__) ."/images/units/$name");
                $db->addReviewUnit($id, $_POST['paragraph'.$row], $_FILES['image'.$row]['name'], $_POST['subtitle'.$row]);
            }
            
header("Location: http://review/index.html");
}

