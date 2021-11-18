import {isEscapeKey} from './util.js';

const ERROR_STATUS = 'error';

const renderModal = (status) => {
  const alertContainer = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const alert = alertContainer.cloneNode(true);

  document.body.append(alert);

  const modal = document.querySelector(`.${status}`);

  if (status === ERROR_STATUS) {
    const errorModalCloseElement = document.querySelector('.error__button');
    errorModalCloseElement.addEventListener('click', () => {
      closeUserModal();
    });

    modal.addEventListener('click', (evt) => {
      if (evt.target !== errorModalCloseElement) {
        closeUserModal();
      }
    });
  } else {
    modal.addEventListener('click', () => {
      closeUserModal();
    });
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUserModal();
  }

  evt.preventDefault();
};


function closeUserModal() {
  const successModal = document.querySelector('.success');
  const errorModal = document.querySelector('.error');

  if (successModal) {
    document.body.removeChild(successModal);
  }
  else if (errorModal) {
    document.body.removeChild(errorModal);
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const openUserModal = (status) => {
  renderModal(status);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {onPopupEscKeydown, openUserModal};
