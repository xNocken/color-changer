import $ from 'jquery';
import handlebars from 'handlebars';

export const changeColor = (rgb) => {
  const { r, g, b } = rgb;

  const nRGB = [r, g, b].map(item => (255 - parseInt(item, 10)));

  $('.name').css({
    color: `rgb(${nRGB[0]}, ${nRGB[1]}, ${nRGB[2]})`,
  });

  $('body').css({
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  });
};

export const setTheme = (id) => {
  const theme = $(`[data-id="${id}"]`).data('theme');

  changeColor(theme);

  $('#r').val(theme.r);
  $('#g').val(theme.g);
  $('#b').val(theme.b);
};

export const createElement = (theme) => {
  const templateSource = $('#colortemplate').html();
  const renderTemplate = handlebars.compile(templateSource);

  const {
    id,
  } = theme;

  $('#themes').append(renderTemplate(theme));

  const newElem = $(`[data-id="${id}"`);
  const newDeleteElem = $(`[data-delete-id="${id}"`);
  const newEditElem = $(`[data-edit-id="${id}"`);

  $('body').trigger('setListener', { newDeleteElem, newEditElem });

  newElem.data('theme', theme);

  newElem.on('click', event => setTheme($(event.target).data('id')));
};
