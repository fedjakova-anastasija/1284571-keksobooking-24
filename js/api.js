import {showSuccessMessage} from './util.js';

const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось получить данные. Попробуйте обновить страницу');
    })
    .then(onSuccess)
    .catch(onFail);
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
    .catch(onFail);
};

export {getData, sendData};
