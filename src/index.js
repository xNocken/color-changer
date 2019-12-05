import $ from 'jquery';

import login from './js/login';
import logout from './js/logout';
import slider from './js/slider';
import security from './js/security';

import './scss/main.scss';

global.$ = $;

$(() => {
  login();
  logout();
  slider();
  security();
});
