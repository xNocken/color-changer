import $ from 'jquery';

import message from './message';
import request from './request';
import routes from './routes';
import { changeColor } from './renderer';

const themes = [];

let editActive = false;
let editIndex = 0;

const setTheme = (number) => {
  const index = themes.findIndex(v => v.id === number);
  const rgb = themes[index];

  changeColor(rgb);

  $('#r').val(rgb.r);
  $('#g').val(rgb.g);
  $('#b').val(rgb.b);
};

const deleteTheme = (id) => {
  themes.forEach((elem, index) => {
    if (elem.id === id) {
      themes.splice(index, 1);
      $.get(routes.delete, { id }).done((response) => {
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

export const createElement = (theme) => {
  const {
    newId,
    r,
    g,
    b,
    name,
  } = theme;

  $('#themes').append(`<div class="items" data-id-div="${newId}"></div>`);
  const newDiv = $(`[data-id-div="${newId}"]`);

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

  $.get(routes.update, { theme: themes[editIndex] }).done((response) => {
    if (response) {
      message(response);
    }
  });

  editActive = false;
};

const saveTheme = (theme) => {
  themes.push(theme);

  $.get(routes.save, { theme }).done((response) => {
    if (response) {
      const { id, msg } = JSON.parse(response);

      message(msg);
      createElement({ id, ...theme });
    }
  });
};

const handleSave = (rgb, name) => {
  const { r, g, b } = rgb;

  if (editActive) {
    saveEditedTheme(rgb, name);
  } else if (name) {
    saveTheme({
      r,
      g,
      b,
      name,
    });
  } else {
    message('Name darf nicht leer sein');
  }
};

export default () => {
  const $text = $('#text');
  const $r = $('#r');
  const $g = $('#g');
  const $b = $('#b');

  request.get();

  $('#r, #g, #b').on('change', () => changeColor({
    r: $r.val(),
    g: $g.val(),
    b: $b.val(),
  }));

  $('#button').on('click', () => handleSave({
    r: $r.val(),
    g: $g.val(),
    b: $b.val(),
  }, $text.val()));
};
