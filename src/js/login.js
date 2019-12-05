import $ from 'jquery';

import message from './message';

export default () => {
  $('#login-form').on('submit', (event) => {
    const { target } = event;
    const action = target[3].checked ? 'register' : 'login';

    event.preventDefault();

    $.ajax({
      url: `/src/php/${action}.php`,
      method: 'POST',
      data: $(target).serialize(),
    }).done((response) => {
      const data = JSON.parse(response);

      message(data.msg);

      if (data.type === 'success') {
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    });
  });
};
