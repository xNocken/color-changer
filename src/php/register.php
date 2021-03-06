<?php
    require('db.php');
    error_reporting(E_ERROR | E_PARSE);
    $data = [];

    if (isset($_POST["user"]) && isset($_POST["pw"])) {
        $user = strtolower($_POST["user"]);
        $pw = password_hash($_POST["pw"], PASSWORD_DEFAULT);

        $user = $conn->real_escape_string($user);
        $sql = "SELECT user FROM `users` WHERE user = '$user' LIMIT 1;";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $newJsons = [];
            while ($row = $result->fetch_assoc()) {
                $data = [
                    'type' => 'error',
                    'msg'  => 'Username already exists',
                ];
            }
        } else {
            $sql = "INSERT INTO users (`user`, `pw`) VALUES ('". $user . "', '" . $pw . "');";
            if ($conn->query($sql) === false) {
                $data = [
                    'type' => 'error',
                    'msg'  => 'Unkown error',
                ];
            } else {
                $data = [
                    'type' => 'success',
                    'msg'  => 'Registered',
                ];

                $_SESSION["user"] = $user;
            }
        }
        echo json_encode($data);
    }
