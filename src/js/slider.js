import $ from 'jquery';

import request from './request';
import {
  changeColor,
  getColor,
  colorInput,
  randomHex,
} from './renderer';

export default () => {
  const $text = $('#text');

  request.get();

  $('#r, #g, #b').on('input', () => changeColor(getColor()));

  $('#button').on('click', () => request.save(getColor(), $text.val()));

  $('#color-hex').on('input', (event) => { colorInput(event.target); });

  $('body').on('setListener', (item, items) => {
    $(items.newDeleteElem).on('click', event => request.delete($(event.currentTarget).data('delete-id')));
    $(items.newEditElem).on('click', event => request.update($(event.currentTarget).data('edit-id')));
  });

  $('#random-number').on('click', () => randomHex());
};
