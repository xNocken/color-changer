<?php
require('./src/php/db.php');

$user = null;

if (isset($_SESSION['user'])) {
  $user = $_SESSION['user'];
}
?>
<html>
  <head>
    <title>Color Changer</title>
    <link rel="stylesheet" href="./dist/style.css">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
  </head>
  <body>
    <div class="center">
      <?php if (!$user) {
        include('login.html');
      } else {
        include('changer.html');
      } ?>
    </div>
    <script src="./dist/app.js"></script>
  </body>
</html>
