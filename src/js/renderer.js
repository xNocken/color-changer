import $ from 'jquery';
import handlebars from 'handlebars';

export const getColor = () => ({
  r: $('#r').val(),
  g: $('#g').val(),
  b: $('#b').val(),
});

const convertToHex = (number) => {
  const parsedNumber = parseInt(number, 10).toString(16);
  return parsedNumber.length === 1 ? 0 + parsedNumber : parsedNumber;
};

export const changeColor = (rgb) => {
  const { r, g, b } = rgb;

  $('#color-hex').text(`#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`.toUpperCase());

  $('#color').css({
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
