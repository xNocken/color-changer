import $ from 'jquery';

import login from './js/login';
import message from './js/alert';
import slider from './js/slider';

import './scss/main.scss';

global.$ = $;

$(() => {
  login();
  message('Hallo');
  slider();
});
