import {setUserFormSubmit, resetForm} from './user-form.js';
import {map} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {makeMapFormActive, makeNoticeFormActive, makeInactive} from './page-state.js';
import {showFilteredPoints} from './map-filter.js';

makeInactive();

map.whenReady(() => {
  makeNoticeFormActive();
  getData(
    (points) => {
      makeMapFormActive();
      showFilteredPoints(points);
    },
    () => showAlert('Ошибка на стороне сервера. Попробуйте позже'),
  );
});

setUserFormSubmit(resetForm);
