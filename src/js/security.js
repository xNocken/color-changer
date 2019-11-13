import $ from 'jquery';

export default () => {
  $('#addQuestion').on('click', () => {
    document.location.href = '/security.html';
  });
};
