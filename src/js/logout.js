import $ from 'jquery';

import message from './alert';

export default () => {
  $('#logout').on('click', () => {
    $.ajax({
      url: '/src/php/api/logout.php',
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
