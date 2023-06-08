import {showBigPicture} from './big-picture.js';
import { getPictures } from './data.js';
// import { getRandomPositiveInteger } from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const clearContainer= () => {
  container.innerHTML = '';
};

//переписываю renderPictures из неё и createPicture (?!)
const renderPictures = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures
    .forEach(({comments, description, likes, url}) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureTemplate.querySelector('.picture__img').src = url;
      pictureTemplate.querySelector('.picture__img').alt = description;
      pictureTemplate.querySelector('.picture__comments').textContent = comments.length;
      pictureTemplate.querySelector('.picture__likes').textContent = likes;
      pictureFragment.append(pictureElement);
    });

    container.append(pictureFragment);
  };

renderPictures(getPictures);

pictureElement.addEventListener('click', () => {
  showBigPicture(data);
});

//объявляем функцию, которая найдет в картинке длину коммента
//и запишет её в переменную
const getCommentsLength = (picture) => {
  const commentsLength = picture.querySelector('.picture__comments')
.textContent;
return commentsLength;
};


export { renderPictures, clearContainer, getCommentsLength };
