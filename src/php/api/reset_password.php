<?php
require('../db.php');

$username = $_REQUEST['username'];
$pw = password_hash($_POST["password"], PASSWORD_DEFAULT);
$answer = $_REQUEST['answer'];
$sqlAuth = "SELECT security_answer FROM users WHERE user = '" . $username . "'";
$sql = 'UPDATE users SET pw = \'' . $conn->real_escape_string($pw) . '\' WHERE user = \'' . $conn->real_escape_string($username) . '\'';

$result = $conn->query($sqlAuth);

while ($row = $result->fetch_assoc()) {
    if(password_verify($answer, $row["security_answer"])) {
        $result2 = $conn->query($sql);

        if($result2) {
            $data = [
                "msg"   => "updated successfully",
                "success"      => true,
            ];
        } else {
            $data = [
                "msg"   => "error while saving security question",
                "success"      => false,
                "err"       => $conn->error,
            ];
        }
    } else {
        $data = [
            "msg"   => "Invalid password",
            "success"      => false,
        ];
    }
}

echo json_encode($data);
