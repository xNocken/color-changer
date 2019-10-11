<?php
error_reporting(E_ERROR | E_PARSE);

$servername = "localhost";
$username = "root";
$password = "";


$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$mode = $_REQUEST['mode'];
$json = $_REQUEST['json'];
$id = $_REQUEST['id'];

$themes = json_decode($json);

if ($mode === 'save') {
    $sql = "DELETE FROM `colors`.`themes`;";
    if ($conn->query($sql) === true) {
        foreach ($themes as $theme) {
            $sql = "INSERT INTO `colors`.`themes` (`id`, `r`, `g`, `b`, `name`) VALUES ('". $conn->real_escape_string($theme->id) ."', '". $conn->real_escape_string($theme->r) ."', '". $conn->real_escape_string($theme->g) ."', '". $conn->real_escape_string($theme->b) ."', '". $conn->real_escape_string($theme->name) ."');";
            if ($conn->query($sql) === false) {
                echo $conn->error. "! ";
            }
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

if ($mode === 'get') {
    $sql = 'select id, r, g, b, name from `colors`.`themes`';

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        $newJsons = [];
        while ($row = $result->fetch_assoc()) {
            $newJsons[] = (json_encode($row));
        }
        echo '['. join(', ', $newJsons) . ']';
    } else {
        echo '"no results"';
    }
}

if ($mode === 'delete') {
    $sql = "DELETE FROM `colors`.`themes` WHERE ID = $id";
    if ($conn->query($sql) === false) {
        echo $conn->error. "! ";
    }
}

if($mode === 'update') {
    $sql = 'UPDATE `colors`.`themes` SET'.  " id = '". $conn->real_escape_string($themes->id) ."', r = '". $conn->real_escape_string($themes->r) ."', g= '". $conn->real_escape_string($themes->g) ."', b= '". $conn->real_escape_string($themes->b) ."',name= '". $conn->real_escape_string($themes->name) ."' WHERE id = ". $themes->id .";";
    if ($conn->query($sql) === false) {
        echo $conn->error. "! ";
    }
}

$conn->close();
