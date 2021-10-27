const userRoomNumberSelect = document.querySelector('#room_number');
const userCapacitySelect = document.querySelector('#capacity');
const userSubmitButton = document.querySelector('.ad-form__submit');

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

userCapacitySelect.addEventListener('change', () => {
  checkCapacity();
});
userRoomNumberSelect.addEventListener('change', () => {
  checkCapacity();
});

userSubmitButton.addEventListener('click', () => {
  checkCapacity();
});
