import {onPopupEscKeydown} from './user-modal.js';

const successModal = document.querySelector('.success');
const errorModal = document.querySelector('.error');

const MAX_ITEMS_COUNT = 5;
const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max, precision = 1) => {
  if (min < 0 || max < 0 || precision < 0) {
    throw ('Диапазон и точность могут быть только положительными, включая ноль.');
  }

  if (min > max) {
    throw ('Значение «до» должно должно быть больше, чем значение «от».');
  }
  const randomNumber = Math.random() * (max - min + 1) + min;
  return precision === 1 ? Math.floor(randomNumber) : randomNumber.toPrecision(precision);
};

const getRandomIndexItem = (array) => getRandomNumber(0, array.length - 1);

const getRandomItem = (array) => array[getRandomNumber(0, array.length - 1)];

const getItems = (array) => {
  const result = [];
  const resultSize = getRandomNumber(0, MAX_ITEMS_COUNT);

  for (let size = 0; size < resultSize; size++) {
    result.push(getRandomItem(array));
  }

  return result;
};

const getDistinctItems = (array) => {
  const result = array.slice();
  const removedCount = getRandomIndexItem(result);

  for (let count = 0; count <= removedCount; count++) {
    result.splice(getRandomIndexItem(result), 1);
  }

  return result;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (status, modal) => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', (evt) => onPopupEscKeydown(evt, modal));
};

const showErrorMessage = () => {
  showMessage('error', errorModal);
};

const showSuccessMessage = () => {
  showMessage('success', successModal);
};

export {getRandomItem, getRandomNumber, getItems, getDistinctItems, showAlert, showSuccessMessage, showErrorMessage, isEscapeKey};
