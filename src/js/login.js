import $ from 'jquery';

import message from './alert';

export default () => {
  $('#login-form').on('submit', (event) => {
    const { target } = event;
    const action = target[2].checked ? 'register' : 'login';

    event.preventDefault();

    $.ajax({
      url: `/src/php/${action}.php`,
      method: 'POST',
      data: {
        user: target[0].value,
        pw: target[1].value,
      },
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
