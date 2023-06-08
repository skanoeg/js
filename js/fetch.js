// import { onFormSubmit } from './form.js';
// import { hideModal } from '/form.js';

const getData = (onSuccess) => {
fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    onSuccess(pictures);
    document.querySelector('.image-filters').classList.remove('hidden');
  });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram/data',
    {
      method: 'POST',
      body,
    },
    )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
