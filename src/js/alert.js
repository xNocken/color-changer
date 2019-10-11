import $ from 'jquery';

let timeout;

export default (message) => {
  clearTimeout(timeout);
  $('#response').text(message);
  timeout = setTimeout(() => { $('#response').empty(); }, 3000);
};
