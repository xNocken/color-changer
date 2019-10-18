import $ from 'jquery';

import message from './message';
import request from './request';
import routes from './routes';
import { changeColor } from './renderer';

const setTheme = (id) => {
  const theme = $(`[data-id="${id}"]`).data('theme');

  changeColor(theme);

  $('#r').val(theme.r);
  $('#g').val(theme.g);
  $('#b').val(theme.b);
};

const deleteTheme = (id) => {
  $.get(routes.delete, { id }).done((response) => {
    message(response);
  });

  $(`[data-id="${id}"`).remove();
  $(`[data-delete-id="${id}"`).remove();
  $(`[data-edit-id="${id}"`).remove();
};

const editTheme = (id) => {
  const theme = $(`[data-id="${id}"]`).data('theme');
  $(`[data-id="${id}"]`).addClass('edit');

  setTheme(id);
  $('#text').val(theme.name);
};

export const createElement = (theme) => {
  const {
    id,
    name,
  } = theme;

  $('#themes').append(`<div class="items" data-id-div="${id}"></div>`);
  const newDiv = $(`[data-id-div="${id}"]`);

  newDiv.append(`<div class="theme-select" data-id="${id}">${name}</div>`);
  newDiv.append(`<div class="theme-select" data-delete-id="${id}">Delete </div>`);
  newDiv.append(`<div class="theme-select" data-edit-id="${id}">Edit</div>`);

  const newElem = $(`[data-id="${id}"`);
  const newDeleteElem = $(`[data-delete-id="${id}"`);
  const newEditElem = $(`[data-edit-id="${id}"`);

  newElem.data('theme', theme);

  newDeleteElem.on('click', event => deleteTheme($(event.target).data('delete-id')));
  newEditElem.on('click', event => editTheme($(event.target).data('edit-id')));
  newElem.on('click', event => setTheme($(event.target).data('id')));
};

const saveEditedTheme = (rgb, name, id) => {
  const theme = $(`[data-id="${id}"]`).data('theme');
  const { r, g, b } = rgb;
  const newId = theme.id;

  const newElem = $(`[data-id="${newId}"`);
  message(newId);

  newElem.data('theme', {
    name,
    r,
    g,
    b,
    id: newId,
  });

  newElem.text(name);

  $.get(routes.update, { theme }).done((response) => {
    if (response) {
      message(response);
    }
  });

  $('.edit').removeClass('edit');
};

const saveTheme = (theme) => {
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
  const editElem = $('.edit');

  if (editElem.length !== 0) {
    saveEditedTheme(rgb, name, editElem.data('theme').id);
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
