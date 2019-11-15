import $ from 'jquery';

let timeout;

$(() => {
  $('.center').prepend('<div id="response"></div>');
});

export default (message, time = 3000) => {
  clearTimeout(timeout);
  $('#response').text(message);
  timeout = setTimeout(() => { $('#response').empty(); }, time);
};
