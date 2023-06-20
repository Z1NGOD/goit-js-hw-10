import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('#placeholderSingle');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const breedSelectContainer = document.querySelector('.breed-select');
error.textContent = '';

const hideLoader = () => {
  loader.style.display = 'none';
  breedSelectContainer.style.display = 'block';
};

const showLoader = () => {
  loader.style.display = 'block';
  breedSelectContainer.style.display = 'none';
  catInfo.style.display = 'none';
  error.style.display = 'none';
};

const breedSelection = (breeds) => {
  const options = breeds.map((breed) => ({
    value: breed.id,
    text: breed.name,
  }));

  new SlimSelect({
    select: '#placeholderSingle',
    data: options,
  });

  breedSelect.addEventListener('change', handleBreedSelectChange);
};

const handleBreedSelectChange = (e) => {
  const breedId = e.target.value;
  showLoader();

  fetchCatByBreed(breedId)
    .then((cat) => {
      catInfo.innerHTML = `<img class="cat-img" src="${cat.url}" alt="cat" width="300" height="300">
        <h1 class="cat-name">${cat.breeds[0].name}</h1>
        <p class="cat-description">${cat.breeds[0].description}</p>
        <p class="cat-temperament">${"Temperament: " + cat.breeds[0].temperament}</p>`;
      catInfo.style.display = 'block';
      hideLoader();
    })
    .catch((error) => {
      showError();
      hideLoader();
    });
};

const showError = () => {
  error.style.display = 'block';
  Notiflix.Notify.failure('Oops, something went wrong');
};

const fetchBreedsData = () => {
  showLoader();

  fetchBreeds()
    .then((breeds) => {
      breedSelection(breeds);
      hideLoader();
    })
    .catch(() => {
      showError();
      hideLoader();
    });
};
fetchBreedsData();
//