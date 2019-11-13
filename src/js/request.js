import $ from 'jquery';

import routes from './routes';
import message from './message';
import { setTheme, createElement } from './renderer';

const getThemes = () => {
  $.get(routes.get).done((response) => {
    const data = JSON.parse(response);

    if (data.type === 'error') {
      message(data.msg);

      return;
    }

    data.forEach(theme => createElement(theme));
  });
};

const saveTheme = (theme) => {
  $.get(routes.save, { theme }).done((response) => {
    if (response) {
      const { id, msg } = JSON.parse(response);

      message(msg);
      createElement({ id, ...theme });
    }
  });
};

const updateTheme = (id) => {
  const theme = $(`[data-id="${id}"]`).data('theme');

  $('.edit').removeClass('edit');
  $(`[data-id="${id}"]`).addClass('edit');

  setTheme(id);
  $('#text').val(theme.name);
};

const deleteTheme = (id) => {
  $.get(routes.delete, { id }).done((response) => {
    message(response);
  });

  $(`[data-id="${id}"`).remove();
  $(`[data-delete-id="${id}"`).remove();
  $(`[data-edit-id="${id}"`).remove();
};

const saveEditedTheme = (rgb, name, id) => {
  let theme = $(`[data-id="${id}"]`).data('theme');
  const { r, g, b } = rgb;
  const newId = theme.id;

  const newElem = $(`[data-id="${newId}"`);
  message(newId);

  theme = {
    name,
    r,
    g,
    b,
    id: newId,
  };

  newElem.data('theme', theme);

  newElem.text(name);

  $.get(routes.update, { theme }).done((response) => {
    if (response) {
      message(response);
    }
  });

  $('.edit').removeClass('edit');
};

const handleSave = (rgb, name) => {
  const { r, g, b } = rgb;
  const editElem = $('.edit');

  if (editElem.length !== 0) {
    saveEditedTheme(rgb, name, editElem.data('theme').id);
  } else if (name) {
    saveTheme({
      r,
      g,
      b,
      name,
    });
  } else {
    message('Name darf nicht leer sein');
  }
};

export default {
  delete: id => deleteTheme(id),
  get: () => getThemes(),
  save: (rgb, name) => handleSave(rgb, name),
  update: id => updateTheme(id),
};
