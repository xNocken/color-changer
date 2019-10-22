import $ from 'jquery';
import request from './request';

export const changeColor = (rgb) => {
  const { r, g, b } = rgb;

  $('body').css({
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  });
};

export const setTheme = (id) => {
  const theme = $(`[data-id="${id}"]`).data('theme');

  changeColor(theme);

  $('#r').val(theme.r);
  $('#g').val(theme.g);
  $('#b').val(theme.b);
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

  newDeleteElem.on('click', event => request.delete($(event.target).data('delete-id')));
  newEditElem.on('click', event => request.update($(event.target).data('edit-id')));
  newElem.on('click', event => setTheme($(event.target).data('id')));
};
