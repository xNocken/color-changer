import $ from 'jquery';

import login from './js/login';
import logout from './js/logout';
import message from './js/message';
import slider from './js/slider';
import security from './js/security';

import './scss/main.scss';

global.$ = $;

$(() => {
  login();
  logout();
  message('Hallo');
  slider();
  security();
});
