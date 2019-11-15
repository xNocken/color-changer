<?php
require('../db.php');

$user = $_REQUEST['username'];

$sql = 'SELECT user, security_question FROM users WHERE user = \'' . $user . '\'';

$result = $conn->query($sql);

if (mysqli_num_rows($result) == 0) {
    $data = [
        "exist" => false,
    ];
} else {
    $data = [
        "exist" => true,
        "securityQuestion" => $result->fetch_assoc()['security_question'],
    ];
}

echo json_encode($data);
