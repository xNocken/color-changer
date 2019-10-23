import $ from 'jquery';
import request from './request';

export default (newDeleteElem, newEditElem) => {
  newDeleteElem.on('click', event => request.delete($(event.target).data('delete-id')));
  newEditElem.on('click', event => request.update($(event.target).data('edit-id')));
};
