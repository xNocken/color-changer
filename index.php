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
  </head>
  <body>
    <div class="center">
      <?php if (!$user) {
        include('login.html');
      } else { ?>
      <button id="addQuestion">Add security question</button><br><br>
      <button id="logout">Logout</button>
      <div>
        <input class="rs-range" type="range" id="r" min="0" max="255">r<br>
        <input class="rs-range" type="range" id="g" min="0" max="255">g<br>
        <input class="rs-range" type="range" id="b" min="0" max="255">b<br>
        <input type="submit" id="button">
        <input type="text" placeholder="Name" id="text">
        <br>
      </div>

      <h2>Themes</h2>
      <div id="themes"></div>
      <?php } ?>
    </div>
    <script src="./dist/app.js"></script>
  </body>
</html>
