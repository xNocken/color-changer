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

const saveTheme = (r, g, b, name, mode, id = null) => {
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
    let newId = id;
    if (!mode) {
      themes.push({
        r,
        g,
        b,
        name,
        id: null,
      });

      $.get('/src/php/saveTheme.php', {
        json: JSON.stringify({
          r,
          g,
          b,
          name,
        }),
        mode: 'save',
      }).done((response) => {
        if (response) {
          const res = JSON.parse(response);

          message(res.msg);
          newId = res.id;

          createElement(newId, r, g, b, name);
        }
      });
    } else {
      createElement(newId, r, g, b, name);
    }
  } else {
    message('Name darf nicht leer sein');
  }
};

const loadThemes = () => {
  $.get('/src/php/saveTheme.php', { mode: 'get' }).done((response) => {
    if (response === '401') {
      window.location.href = '/login.html';
    }

    const params = JSON.parse(response);
    if (params !== 'no results') {
      params.forEach((elem) => {
        saveTheme(elem.r, elem.g, elem.b, elem.name, 'dsave', parseInt(elem.id, 10));
      });
    }
  });
};

export default () => {
  if (document.title === 'teest') {
    const $r = $('#r');
    const $g = $('#g');
    const $b = $('#b');
    const $text = $('#text');

    loadThemes();
    changeColor($r.val(), $g.val(), $b.val());

    $('#r, #g, #b').on('change', () => changeColor($r.val(), $g.val(), $b.val()));
    $('#button').on('click', () => saveTheme($r.val(), $g.val(), $b.val(), $text.val()));
  }
};
