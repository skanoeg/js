'use strict'


import { previewImage } from './imageEditor.js;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageChooser = document.querySelector('upload-select-image');

imageChooser.addEventListener('change', () => {
const image = imageChooser.files[0];
const imageName = file.name.toLowerCase();

const matches = FILE_TYPES.some((it) => {
  return fileName.endsWith(it);
});

if (matches) {
  previewImage.src = URL.createObjectURL(file);
}
});


