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

const convertToDecimal = hex => parseInt(hex.toString(), 16) || 0;

export const changeColor = (rgb) => {
  const { r, g, b } = rgb;

  $('#color-hex').val(`#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`.toUpperCase());

  $('#color').css({
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  });

  $('#r').val(r);
  $('#g').val(g);
  $('#b').val(b);
};

export const colorInput = (target) => {
  const hex = $(target).val();
  if (hex.length === 7) {
    changeColor({
      r: convertToDecimal(hex.charAt(1) + hex.charAt(2)),
      g: convertToDecimal(hex.charAt(3) + hex.charAt(4)),
      b: convertToDecimal(hex.charAt(5) + hex.charAt(6)),
    });
  } else if (hex.length === 6 && hex.charAt(0) !== '#') {
    $(target).val(`#${hex}`);
    colorInput(target);
  }
};

export const setTheme = (id) => {
  const theme = $(`[data-id="${id}"]`).data('theme');

  changeColor(theme);
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
