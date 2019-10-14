<?php
require('../db.php');

$data = [];

$theme = $_REQUEST['theme'];

// TODO validieren

$sql = 'INSERT INTO
            themes
        SET
            r = ' . $conn->real_escape_string($theme['r']) . ',
            g = ' . $conn->real_escape_string($theme['g']) . ',
            b = ' . $conn->real_escape_string($theme['b']) . ',
            name = \'' . $conn->real_escape_string($theme['name']) . '\',
            user = \'' . $_SESSION['user'] . '\'';

if ($conn->query($sql) === false) {
    echo $conn->error. '!';
} else {
    echo json_encode([
        'id' => $conn->insert_id,
    ]);
}

$conn->close();
