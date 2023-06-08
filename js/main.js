import {getPictures} from './data.js';
import {renderPictures} from './picture.js';
import './imageEditor.js';
import {getData} from './fetch.js';
import {hideModal, renderDiscussedPictures, setFilterDiscussed} from './form.js';
import { setFilterDefault, setFilterRandom, setFilterDiscussed, onFormSubmit } from './form.js';
import { debounce } from './util.js';
import './previewUpload.js';

const RERENDER_DELAY = 500;

getData ((pictures) => {
renderPictures(getPictures);
setFilterDefault(debounce(
  () => renderPictures(getPictures),
  RERENDER_DELAY,
));
setFilterRandom(debounce(
  () => renderPictures(getPictures),
  RERENDER_DELAY,
));
setFilterDiscussed(debounce(
  () => renderPictures(getPictures),
  RERENDER_DELAY,
));
};
onFormSubmit(hideModal);
