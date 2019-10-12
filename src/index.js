import $ from 'jquery';

import login from './js/login';
import logout from './js/logout';
import message from './js/alert';
import slider from './js/slider';

import './scss/main.scss';

global.$ = $;

$(() => {
  login();
  logout();
  message('Hallo');
  slider();
});
