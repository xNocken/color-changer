import $ from 'jquery';
import handlebars from 'handlebars';

const threshhold = 25;

export const getColor = () => ({
  r: $('#r').val(),
  g: $('#g').val(),
  b: $('#b').val(),
});

const convertToHex = (number) => {
  const parsedNumber = parseInt(number, 10).toString(16);
  return parsedNumber.length === 1 ? parsedNumber + 0 : parsedNumber;
};

export const changeColor = (rgb) => {
  const { r, g, b } = rgb;

  const nRGB = Object.values(rgb).map((item) => {
    const inverseColor = 255 - parseInt(item, 10);

    if ((inverseColor > 127 + threshhold) || (inverseColor < 127 - threshhold)) {
      return inverseColor;
    }
    return 0;
  });

  $('p, div').css({
    color: `rgb(${nRGB[0]}, ${nRGB[1]}, ${nRGB[2]})`,
  });

  $('#color-hex').text(`#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`.toUpperCase());

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
