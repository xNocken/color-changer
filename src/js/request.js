import $ from 'jquery';

import routes from './routes';
import message from './message';
import { createElement } from './slider';

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

const saveTheme = () => {
};

const updateTheme = () => {
};

const deleteTheme = () => {
};

export default {
  delete: () => deleteTheme(),
  get: () => getThemes(),
  save: () => saveTheme(),
  update: () => updateTheme(),
};
