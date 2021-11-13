import {setUserFormSubmit, resetForm} from './user-form.js';
import {showPoints} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const SIMILAR_NOTICE_COUNT = 10;

getData(
  (points) => showPoints(points.slice(0, SIMILAR_NOTICE_COUNT)),
  () => showAlert('Не удалось получить данные. Попробуйте обновить страницу'),
);

setUserFormSubmit(resetForm);
