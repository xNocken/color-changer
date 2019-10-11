import $ from 'jquery';
import message from './alert';

const themes = [];

let editActive = false;
let editIndex = 0;

const changeColor = (r, g, b) => {
  const $body = $('body');
  const $r = $('#r');
  const $g = $('#g');
  const $b = $('#b');

  $r.val(r);
  $g.val(g);
  $b.val(b);

  $body.css({
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  });
};

const setTheme = (number) => {
  const index = themes.findIndex(v => v.id === number);

  const { r, g, b } = themes[index];

  changeColor(r, g, b);
};

const deleteTheme = (id) => {
  themes.forEach((elem, index) => {
    if (elem.id === id) {
      themes.splice(index, 1);
      $.get('/src/php/saveTheme.php', { id, mode: 'delete' }).done((response) => {
        message(response);
      });

      $(`[data-id="${id}"`).hide();
      $(`[data-delete-id="${id}"`).hide();
      $(`[data-edit-id="${id}"`).hide();
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

const saveTheme = (r, g, b, name, mode, id = themes[0] ? themes[themes.length - 1].id + 1 : 0) => {
  if (editActive) {
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

    $.get('/src/php/saveTheme.php', { json: JSON.stringify(themes[editIndex]), mode: 'update' }).done((response) => {
      if (response) {
        message(response);
      }
    });

    editActive = false;
  } else if (name) {
    $('#themes').append(`<div class="items" data-id-div="${id}"></div>`);
    const newDiv = $(`[data-id-div="${id}"`);

    newDiv.append(`<div class="theme-select" data-id="${id}">${name} </div>`);
    newDiv.append(`<div class="theme-select" data-delete-id="${id}">Delete </div>`);
    newDiv.append(`<div class="theme-select" data-edit-id="${id}">Edit</div>`);

    const newElem = $(`[data-id="${id}"`);
    const newDeleteElem = $(`[data-delete-id="${id}"`);
    const newEditElem = $(`[data-edit-id="${id}"`);

    newDeleteElem.on('click', event => deleteTheme($(event.target).data('delete-id')));
    newEditElem.on('click', event => editTheme($(event.target).data('edit-id')));
    newElem.on('click', event => setTheme($(event.target).data('id')));
    themes.push({
      r,
      g,
      b,
      name,
      id,
    });

    if (!mode) {
      $.get('/src/php/saveTheme.php', { json: JSON.stringify(themes), mode: 'save' }).done((response) => {
        if (response) {
          message(response);
        }
      });
    }
  } else {
    message('Name darf nicht leer sein');
  }
};

const loadThemes = () => {
  $.get('/src/php/saveTheme.php', { mode: 'get' }).done((response) => {
    const params = JSON.parse(response);
    if (params !== 'no results') {
      params.forEach((elem) => {
        saveTheme(elem.r, elem.g, elem.b, elem.name, 'dsave', parseInt(elem.id, 10));
      });
    }
  });
};

export default () => {
  const $r = $('#r');
  const $g = $('#g');
  const $b = $('#b');
  const $text = $('#text');

  loadThemes();
  changeColor($r.val(), $g.val(), $b.val());

  $('#r, #g, #b').on('change', () => changeColor($r.val(), $g.val(), $b.val()));
  $('#button').on('click', () => saveTheme($r.val(), $g.val(), $b.val(), $text.val()));
};
