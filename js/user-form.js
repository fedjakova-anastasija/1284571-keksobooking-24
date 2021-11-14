import {sendData} from './api.js';
import {showErrorMessage} from './util.js';
import {map, mainPinMarker, CENTER_LAT, CENTER_LNG} from './map.js';

const userRoomNumberSelect = document.querySelector('#room_number');
const userCapacitySelect = document.querySelector('#capacity');
const userHousingTypeSelect = document.querySelector('#type');
const userPriceInput = document.querySelector('#price');
const userTimeinSelect = document.querySelector('#timein');
const userTimeoutSelect = document.querySelector('#timeout');
const userSubmitButton = document.querySelector('.ad-form__submit');
const userForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const housingType = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const checkCapacity = () => {
  const userCapacityNumberValue = Number(userCapacitySelect.value);
  const userRoomNumberValue = Number(userRoomNumberSelect.value);

  if (userRoomNumberValue === 100 && userCapacityNumberValue !== 0) {
    userCapacitySelect.setCustomValidity('Необходимо выбрать поле "не для гостей"');
    userCapacitySelect.reportValidity();

    return;
  }

  if (userCapacityNumberValue > userRoomNumberValue && userCapacityNumberValue !== 0) {
    const invalidText = userRoomNumberValue === 1 ? 'поле "для 1 гостя"' : `${userRoomNumberValue} или менее гостей`;
    userCapacitySelect.setCustomValidity(`Необходимо выбрать ${invalidText}`);
  } else if (userCapacityNumberValue === 0 && userRoomNumberValue !== 100) {
    userCapacitySelect.setCustomValidity('Необходимо выбрать поле с количеством гостей');
  } else {
    userCapacitySelect.setCustomValidity('');
  }
  userCapacitySelect.reportValidity();
};

const checkHousingType = () => {
  const userHousingTypeValue = userHousingTypeSelect.value;

  userPriceInput.placeholder = housingType[userHousingTypeValue];
  userCapacitySelect.reportValidity();
};

const checkPrice = () => {
  const userPriceValue = Number(userPriceInput.value);
  const userHousingTypeValue = userHousingTypeSelect.value;

  if (userPriceValue < housingType[userHousingTypeValue]) {
    userPriceInput.setCustomValidity(`Минимальная цена ${housingType[userHousingTypeValue]}`);
  } else {
    userPriceInput.setCustomValidity('');
  }

  userPriceInput.reportValidity();
};

const checkTimein = (evt) => userTimeoutSelect.value = evt.target.value;

const checkTimeout = (evt) => userTimeinSelect.value = evt.target.value;

userCapacitySelect.addEventListener('change', checkCapacity);
userRoomNumberSelect.addEventListener('change', checkCapacity);
userHousingTypeSelect.addEventListener('change', checkHousingType);
userPriceInput.addEventListener('change', checkPrice);
userTimeinSelect.addEventListener('change', checkTimein);
userTimeoutSelect.addEventListener('change', checkTimeout);

userSubmitButton.addEventListener('click', () => {
  checkCapacity();
  checkHousingType();
});

const setUserFormSubmit = (onSuccess) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      showErrorMessage,
      new FormData(evt.target),
    );
  });
};

const resetForm = () => {
  const addressInput = document.querySelector('#address');
  const latlng = L.latLng(CENTER_LAT, CENTER_LNG);

  userForm.reset();
  mapFiltersForm.reset();
  mainPinMarker.setLatLng(latlng);
  map.closePopup();
  addressInput.value = `${CENTER_LAT}, ${CENTER_LNG}`;
};

export {setUserFormSubmit, resetForm};
