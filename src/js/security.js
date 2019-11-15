import $ from 'jquery';
import message from './message';

const changePassword = (target, username) => {
  if (target[1].value === target[2].value) {
    const data = {
      password: target[1].value,
      answer: target[0].value,
      username,
    };

    $.post('/src/php/api/reset_password.php', data, (response) => {
      const { msg, success } = JSON.parse(response);

      message(msg);

      if (success) {
        setTimeout(() => {
          document.location.href = '/';
        });
      }
    });
  } else {
    message('Passwords dont match');
  }
};

export default () => {
  const $resetForm = $('#reset_password');

  $('#security_form').on('submit', (event) => {
    event.preventDefault();
    const { target } = event;
    const data = {
      password: target[0].value,
      question: target[1].value,
      answer: target[2].value,
    };

    $.post('/src/php/api/update_security_question.php', data, (Response) => {
      const anwer = JSON.parse(Response);
      message(anwer.message);
      if (anwer.success) {
        setTimeout(() => {
          document.location.href = '/';
        }, 1000);
      }
    });
  });

  $resetForm.on('submit', (event) => {
    event.preventDefault();

    const { target } = event;

    if (target[4]) {
      changePassword(target, $resetForm.data('username'));
      return;
    }

    $resetForm.data('username', target[0].value);

    const data = {
      username: target[0].value,
      value: 'security_number',
    };

    $.post('/src/php/api/check_username.php', data, (response) => {
      const { exist, securityQuestion } = JSON.parse(response);

      if (securityQuestion === null) {
        message('No Security question set');
        setTimeout(() => {
          document.location.href = '/';
        }, 3000);
        return;
      }

      if (exist) {
        $resetForm.empty();
        $resetForm.append(`<p>${securityQuestion}</p>
                          <input type="text" placeholder="Answer"><br>
                          <input autocomplete="on" type="password" placeholder="Password"><br>
                          <input autocomplete="on" type="password" placeholder="Repeat Password"><br>
                          <input type="submit" value="submit">
                          <input type="hidden" value="change">`);
      }

      message(exist);
    });
  });
};
