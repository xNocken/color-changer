<?php
require('../db.php');

$result = $conn->query('SELECT * FROM themes WHERE user = \'' . $_SESSION['user'] . '\'');

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo json_encode([
        'type' => 'error',
        'msg'  => 'No results',
    ]);
}

$conn->close();
