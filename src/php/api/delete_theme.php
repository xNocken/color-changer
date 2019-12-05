<?php
require('../db.php');

$id = $_REQUEST['id'];
$sql = 'DELETE FROM themes WHERE ID = \'' . $id . '\' AND USER = \'' . $_SESSION['user'] . '\'';
$result = $conn->query($sql);
$effectedRows = mysqli_affected_rows($conn);

if ($result === false) {
    echo $conn->error . '!';
} else if ($effectedRows == 0){
    echo 'Invalid username!';
} else {
    echo 'Theme successfully deleted';
}

$conn->close();
