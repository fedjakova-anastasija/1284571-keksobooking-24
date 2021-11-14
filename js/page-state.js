const noticeForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const toggleForm = (form, disabled = true) => {
  const action = disabled ? (formItem) => formItem.setAttribute('disabled', '') : (formItem) => formItem.removeAttribute('disabled');
  for (const formItem of form) {
    action(formItem);
  }
};

const makeInactive = () => {
  noticeForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  toggleForm(noticeForm);
  toggleForm(mapForm);
};

const makeActive = () => {
  noticeForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  toggleForm(noticeForm, false);
  toggleForm(mapForm, false);
};

export {makeActive, makeInactive};
