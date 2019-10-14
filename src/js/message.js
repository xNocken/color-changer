import $ from 'jquery';

let timeout;

$(() => {
  $('.center').prepend('<div id="response"></div>');
});

export default (message) => {
  clearTimeout(timeout);
  $('#response').text(message);
  timeout = setTimeout(() => { $('#response').empty(); }, 3000);
};
