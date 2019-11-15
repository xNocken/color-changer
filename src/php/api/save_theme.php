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
            use.r = \'' . $_SESSION['user'] . '\'';

if ($conn->query($sql) === false) {
    $data = [
        "err" => $conn->error. '!',
        "id" => null,
        "success" => false,
        "msg" => "Error while saving Theme",
    ];
} else {
    $data = [
        'id' => $conn->insert_id,
        "success" => true,
        "msg" => "Saved successfully",
    ];
}

echo json_encode($data);
$conn->close();
