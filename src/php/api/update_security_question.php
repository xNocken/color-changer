<?php
require('../db.php');

$question = $_REQUEST['question'];
$answer = password_hash($_REQUEST["answer"], PASSWORD_DEFAULT);
$pw = $_REQUEST['password'];

$sqlAuth = "SELECT pw FROM users WHERE user = '" . $_SESSION["user"] . "'";

$sql = 'UPDATE
            users
        SET
            security_question = \'' . $conn->real_escape_string($question) . '\',
            security_answer = \'' . $conn->real_escape_string($answer) . '\'
        WHERE
            user = \'' . $_SESSION['user'] . '\'';


$result = $conn->query($sqlAuth);

while ($row = $result->fetch_assoc()) {
    if(password_verify($pw, $row["pw"])) {
        $result2 = $conn->query($sql);

        if($result2) {
            $data = [
                "message"   => "updated successfully",
                "success"      => true,
            ];
        } else {
            $data = [
                "message"   => "error while saving security question",
                "success"      => false,
                "err"       => $conn->error,
            ];
        }
    } else {
        $data = [
            "message"   => "Invalid password",
            "success"      => false,
        ];
    }
}

echo json_encode($data);
