import {isEscapeKey, isEnterKey, showAlert} from './util.js';
import './imageEditor.js';
import { sendData } from './fetch.js';
import { getCommentsLength, clearContainer } from './picture.js';

const form = document.querySelector('.img-upload__form');

const userModal = document.querySelector('.upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

form.method = 'post';
form.enctype = 'multipart/form-data';
form.action = 'https://25.javascript.pages.academy/kekstagram';

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  cancelButton.addEventListener('keydown', onEntKeyDown);
};

userModal.addEventListener('click', (evt) {
  evt.preventDefault();
showModal();
});

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  fileField.classList.add('visually-hidden');
  //если form.reset, то, по идее, уже не нужно убирать обработчики
  // document.removeEventListener('keydown', onEscKeyDown);
  // cancelButton.removeEventListener('click', onCancelButtonClick);
  // cancelButton.removeEventListener('keydown', onEntKeyDown);
};

function onCancelButtonClick()  {
  hideModal();
}

function onEntKeyDown(evt) {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

function onEscKeyDown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

// function onEscKeyDown(evt) {
//   if (evt.key === 'Escape' && !isTextFieldFocused()) {
//     evt.preventDefault();
//     hideModal();
//   }
// }

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onFileInputChange = () => {
  showModal();
};

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});
const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// };

const oneMorePristine = new Pristine(form, {
  classTo: 'image-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'text-description'
});

const validateTextDescription = (commentField) => {
  return commentField.value.length <= 140;
}

oneMorePristine.addValidator(
  commentField,
  validateTextDescription,
  'Комментарий не может быть длиннее 140 символов'
);

form.querySelector('.text-description')
.addEventListener('change', validateTextDescription(evt) {
  evt.preventDefault(),
  oneMorePristine.validate(),
});

commentField.addEventListener('focus', (evt) => {
  evt.preventDefault(),
  showModal(),
});

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};


const onFormSubmit = (onSuccess) => {
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

//Обработчик для фильтра по умолчанию
const filterDefault = document.querySelector('filter-default');

const setFilterDefault = (cb) => {
filterDefault.addEventListener('click', () => {
  clearContainer();
  renderPictures(getPictures);
  cb();
});
};


//Обработчик для фильтра случайных фото
const filterRandom = document.querySelector('filter-random');
const setFilterRandom = (cb) => {
filterRandom.addEventListener('click', () => {
  clearContainer();

  const renderRandomPictures = (pictures) => {
    const pictureFragment = document.createDocumentFragment();

  pictures
  .slice(0, 9)
  .forEach(({comments, description, likes, url}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    pictureFragment.append(pictureElement);
  });
  cb();
  container.append(pictureFragment);
});
};


// объявляем функцию, которая найдет длины комментов
// для картинок и сравнит их
const compareCommentsLength = (pictureA, pictureB) => {

const commentsLengthA = getCommentsLength(pictureA);
const commentsLengthB = getCommentsLength(pictureB);
return commentsLengthB - commentsLengthA;
};


//Обработчик для фильтра массива фото
//с комментами по убыванию
const filterDiscussed = document.querySelector('filter-discussed');
const setFilterDiscussed = (cb) => {
filterDiscussed.addEventListener('click', () => {
  clearContainer();

  const renderDiscussedPictures = (pictures) => {
    const pictureFragment = document.createDocumentFragment();

  pictures
  .slice(0, 10)
  sort(compareCommentsLength)
  .forEach(({comments, description, likes, url}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    pictureFragment.append(pictureElement);
  });
  cb();
  container.append(pictureFragment);
});
};


 export { onFormSubmit, hideModal, setFilterDefault,
  setFilterRandom, setFilterDiscussed, onFormSubmi, renderDiscussedPictures, renderRandomPictures };
