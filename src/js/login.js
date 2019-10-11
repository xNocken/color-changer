import $ from 'jquery';
import message from './alert';

export default () => {
  $('#login-form').on('submit', (event) => {
    event.preventDefault();
    const user = event.target[0].value;
    const pw = event.target[1].value;

    $.get('/src/php/login.php', { user, pw }).done((response) => {
      const msg = JSON.parse(response);
      message(msg.msg);

      setTimeout(() => {
        if (msg.type === 'success') {
          window.location.href = '/';
        }
      }, 1000);
    });
  });

  $('#register-form').on('submit', (event) => {
    event.preventDefault();
    const user = event.target[0].value;
    const pw = event.target[1].value;

    $.get('/src/php/register.php', { user, pw }).done((response) => {
      const msg = JSON.parse(response);
      message(msg.msg);

      setTimeout(() => {
        if (msg.type === 'success') {
          window.location.href = '/';
        }
      }, 1000);
    });
  });
};
