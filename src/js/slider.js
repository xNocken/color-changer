import $ from 'jquery';

import request from './request';
import { changeColor } from './renderer';

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
