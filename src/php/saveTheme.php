<?php
require('db.php');
error_reporting(E_ERROR | E_PARSE);

$data = [];

$user = $_REQUEST['user'];
$mode = $_REQUEST['mode'];
$json = $_REQUEST['json'];
$id = $_REQUEST['id'];
$user = $_SESSION["user"];

$themes = json_decode($json);

if ($mode === 'save') {

    // TODO validieren
    $sql = "INSERT INTO `themes` (`r`, `g`, `b`, `name`, `user`) VALUES ('". $conn->real_escape_string($themes->r) ."', '". $conn->real_escape_string($themes->g) ."', '". $conn->real_escape_string($themes->b) ."', '". $conn->real_escape_string($themes->name) ."', '". $conn->real_escape_string($user). "');";
    if ($conn->query($sql) === false) {
        echo $conn->error. "! ";
    }
    $data["id"] = $conn->insert_id;
    echo json_encode($data);
}

if ($mode === 'delete') {
    $sql = "DELETE FROM `themes` WHERE ID = $id";
    if ($conn->query($sql) === false) {
        echo $conn->error. "! ";
    }
}

if ($mode === 'update') {
    $sql = 'UPDATE `themes` SET'.  " id = '". $conn->real_escape_string($themes->id) ."', r = '". $conn->real_escape_string($themes->r) ."', g= '". $conn->real_escape_string($themes->g) ."', b= '". $conn->real_escape_string($themes->b) ."',name= '". $conn->real_escape_string($themes->name) ."' WHERE id = ". $themes->id .";";
    if ($conn->query($sql) === false) {
        echo $conn->error. "! ";
    }
}

$conn->close();
