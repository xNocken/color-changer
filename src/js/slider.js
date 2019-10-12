import $ from 'jquery';

import message from './alert';
import { changeColor } from './renderer';

const themes = [];

let editActive = false;
let editIndex = 0;

const setTheme = (number) => {
  const index = themes.findIndex(v => v.id === number);
  const rgb = themes[index];
  const { r, g, b } = rgb;

  changeColor(rgb);

  $('#r').val(r);
  $('#g').val(g);
  $('#b').val(b);
};

const deleteTheme = (id) => {
  themes.forEach((elem, index) => {
    if (elem.id === id) {
      themes.splice(index, 1);
      $.get('/src/php/api/delete_theme.php', { id }).done((response) => {
        message(response);
      });

      $(`[data-id="${id}"`).remove();
      $(`[data-delete-id="${id}"`).remove();
      $(`[data-edit-id="${id}"`).remove();
    }
  });
};

const editTheme = (id) => {
  const index = themes.findIndex(v => v.id === id);
  editActive = true;
  editIndex = index;
  setTheme(id);
  $('#text').val(themes[index].name);
};

const createElement = (newId, r, g, b, name) => {
  $('#themes').append(`<div class="items" data-id-div="${newId}"></div>`);
  const newDiv = $(`[data-id-div="${newId}"`);

  newDiv.append(`<div class="theme-select" data-id="${newId}">${name} </div>`);
  newDiv.append(`<div class="theme-select" data-delete-id="${newId}">Delete </div>`);
  newDiv.append(`<div class="theme-select" data-edit-id="${newId}">Edit</div>`);

  const newElem = $(`[data-id="${newId}"`);
  const newDeleteElem = $(`[data-delete-id="${newId}"`);
  const newEditElem = $(`[data-edit-id="${newId}"`);

  newDeleteElem.on('click', event => deleteTheme($(event.target).data('delete-id')));
  newEditElem.on('click', event => editTheme($(event.target).data('edit-id')));
  newElem.on('click', event => setTheme($(event.target).data('id')));
  themes.push({
    r,
    g,
    b,
    name,
    id: newId,
  });
};

const saveEditedTheme = (rgb, name) => {
  const { r, g, b } = rgb;
  const newId = themes[editIndex].id;

  const newElem = $(`[data-id="${newId}"`);
  message(newId);

  themes[editIndex] = {
    name,
    r,
    g,
    b,
    id: newId,
  };

  newElem.text(name);

  $.get('/src/php/api/update_theme.php', { theme: themes[editIndex] }).done((response) => {
    if (response) {
      message(response);
    }
  });

  editActive = false;
};

const saveTheme = (rgb, name, mode, id = null) => {
  const { r, g, b } = rgb;

  if (editActive) {
    saveEditedTheme(rgb, name);
  } else if (name) {
    let newId = id;
    if (!mode) {
      themes.push({
        r,
        g,
        b,
        name,
        id: null,
      });

      $.get('/src/php/api/save_theme.php', {
        theme: {
          r,
          g,
          b,
          name,
        },
        mode: 'save',
      }).done((response) => {
        if (response) {
          const res = JSON.parse(response);

          message(res.msg);
          newId = res.id;

          createElement(newId, r, g, b, name);
        }
      });
    }
  } else {
    message('Name darf nicht leer sein');
  }
};

const loadThemes = () => {
  $.get('/src/php/api/get_themes.php').done((response) => {
    const data = JSON.parse(response);

    if (data.type === 'error') {
      message(data.msg);

      return;
    }

    data.forEach((item) => {
      const { r, g, b } = item;

      createElement(parseInt(item.id, 10), r, g, b, item.name);
    });
  });
};

export default () => {
  const $text = $('#text');
  const $r = $('#r');
  const $g = $('#g');
  const $b = $('#b');

  loadThemes();

  $('#r, #g, #b').on('change', () => changeColor({
    r: $r.val(),
    g: $g.val(),
    b: $b.val(),
  }));

  $('#button').on('click', () => saveTheme({
    r: $r.val(),
    g: $g.val(),
    b: $b.val(),
  }, $text.val()));
};
