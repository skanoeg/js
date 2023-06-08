const sliderElement = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview');
const valueElement = document.querySelector('.scale__control--value');
const previewImageEffect = document.querySelector('.effects__radio');
const sliderElementMakeSmaller = document.querySelector('.scale__control--smaller');


noUiSlider.create(sliderElementMakeSmaller, {
range: {
  min: 25,
  max: 100,
}
start: 100,
step: 25,
connect: 'higher',
});

sliderElementMakeSmaller.noUiSlider.on('update', () => {
  valueElement.value = sliderElementMakeSmaller.noUiSlider.get();
});

const sliderElementMakeBigger = document.querySelector('.scale__control--bigger');
noUiSlider.create(sliderElementMakeBigger, {
range: {
  min: 25,
  max: 100,
}
start: 100,
step: 25,
connect: 'higher',
});

sliderElementMakeBigger.noUiSlider.on('update', () => {
  valueElement.value = sliderElementMakeBigger.noUiSlider.get();
});

valueElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  previewImage.style.transform(scale) = valueElement.value;
});


//Применение фильтра к изображению при выборе радио
previewImage.classList.add('effect_preview--none');

const effect = 'effect_preview';
const effectClass = "`${effect}`+ '--' + previewImageEffect.value'";
previewImageEffect.addEventListener('change', () => {
  evt.preventDefault();
  //хочу удалять класс, присвоенный по предыдущему эффекту
  //но не уверена, т.к. ='' обнулит все имеющиеся классы
  previewImage.className = '';
  previewImage.className = effectClass;
})








