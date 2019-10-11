<?php
require('../db.php');

$result = $conn->query('SELECT * FROM themes WHERE user = \'' . $_SESSION['user'] . '\'');

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

} else {
    $data = [
        'type' => 'error',
        'msg'  => 'No results',
    ];
}

echo json_encode($data);

$conn->close();
