<?php
require('../db.php');

$theme = $_REQUEST['theme'];

$sql = 'UPDATE
            themes
        SET
            r = ' . $conn->real_escape_string($theme['r']) . ',
            g = ' . $conn->real_escape_string($theme['g']) . ',
            b = ' . $conn->real_escape_string($theme['b']) . ',
            name = \'' . $conn->real_escape_string($theme['name']) . '\'
        WHERE
            id = ' . $theme['id'] . ' AND
            user = \'' . $_SESSION['user'] . '\'';

$result = $conn->query($sql);

$effectedRows = mysqli_affected_rows($conn);

if ($result === false) {
    echo $conn->error . '!';
} else if ($effectedRows == 0){
    echo 'Invalid username!';
} else {
    echo 'Theme successfully updated!';
}

$conn->close();
