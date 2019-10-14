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
            id = ' . $theme['id'];

if ($conn->query($sql) === false) {
    echo $conn->error . '!';
} else {
    echo 'Theme successfully updated!';
}

$conn->close();
