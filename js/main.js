import {setUserFormSubmit, resetForm} from './user-form.js';
import {map, showPoints} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {makeActive, makeInactive} from './page-state.js';

const SIMILAR_NOTICE_COUNT = 10;

makeInactive();

map.whenReady(() => {
  makeActive();
  getData(
    (points) => showPoints(points.slice(0, SIMILAR_NOTICE_COUNT)),
    () => showAlert('Ошибка на стороне сервера. Попробуйте позже'),
  );
});

setUserFormSubmit(resetForm);
