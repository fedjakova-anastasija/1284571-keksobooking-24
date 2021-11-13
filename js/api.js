import {showSuccessMessage} from './util.js';

const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Не удалось получить данные. Попробуйте обновить страницу');
      }
    })
    .then((points) => {
      onSuccess(points);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
      showSuccessMessage();
    } else {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch((err) => {
      onFail(err);
    });
};

export {getData, sendData};
