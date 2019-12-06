<div class="themes">
  <h2>Themes</h2>
  <div id="themes"></div>
  <div class="button-wrapper">
    <a class="button" href="/security.php" id="addQuestion">Add security question</a href="/security.html">
    <a class="button" id="logout">Logout</a>
  </div>
  <script type="text/x-handlebars-template" id="colortemplate">
    <div class="items" data-id-div="{{ id }}">
      <div class="theme-select" id="{{ id }}" data-id="{{ id }}" title="{{ name }}">{{ name }}</div>
      <div class="theme-select" data-delete-id="{{ id }}"><?php include('./src/svg/times-solid.svg');?></div>
      <div class="theme-select" data-edit-id="{{ id }}"><?php include('./src/svg/pencil-alt-solid.svg');?></div>
    </div>
  </script>
</div>

<div class="changer-wrapper">
  <div class="color-wrapper">
    <h2>Add new Theme</h2>
    <div id="color"></div>
  </div>
  <div class="changer">
    <div>
      <input type="text" id="color-hex" maxlength="7"></input>
      <input class="rs-range" type="range" id="r" min="0" max="255">r<br>
      <input class="rs-range" type="range" id="g" min="0" max="255">g<br>
      <input class="rs-range" type="range" id="b" min="0" max="255">b<br>
    </div>
  </div>

  <div class="input-group">
    <input class="name-field" type="text" placeholder="Name" id="text">
    <input class="button save-theme" type="submit" id="button" value="Save Theme">
  </div>
</div>
