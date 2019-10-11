import $ from 'jquery';
import slider from './js/slider';
import message from './js/alert';

import './scss/main.scss';

global.$ = $;

$(() => {
  slider();
  message('Hallo');
});
