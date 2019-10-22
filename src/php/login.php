<?php
    require('db.php');
    error_reporting(E_ERROR | E_PARSE);
    $data = [];

    if (isset($_POST["user"]) && isset($_POST["pw"])) {
        $user = strtolower($_POST["user"]);
        $pw = $_POST["pw"];

        $user = $conn->real_escape_string($user);
        $sql = "SELECT user, pw FROM `users` WHERE user = $user LIMIT 1;";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $newJsons = [];
            while ($row = $result->fetch_assoc()) {
                if (password_verify($pw, $row["pw"])) {
                    $data["type"] = "success";
                    $data["msg"] = "Logged in";
                    $_SESSION["user"] = $row["user"];
                }
            }
        }

        if (!$data) {
            $data["type"] = "error";
            $data["msg"] = "Wrong Password or Username";
        }

        echo json_encode($data);
    }

