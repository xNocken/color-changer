<?php
require('../db.php');

$id = $_REQUEST['id'];
$sql = 'DELETE FROM themes WHERE ID = ' . $id;

if ($conn->query($sql) === false) {
    echo $conn->error . '!';
} else {
    echo 'Theme successfully deleted!';
}

$conn->close();
