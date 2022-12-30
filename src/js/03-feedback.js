import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';
const STORAGE_GETTTING = localStorage.getItem(STORAGE_KEY);

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormInput(evt) {
  let inputStorage = localStorage.getItem(STORAGE_KEY);
  inputStorage = inputStorage ? JSON.parse(inputStorage) : {};
  inputStorage[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputStorage));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const savedDataObject = {};
  const savedDataForm = new FormData(form);
  savedDataForm.forEach((value, name) => (savedDataObject[name] = value));
  console.log(savedDataObject);
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea(evt) {
  let savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    savedData = JSON.parse(savedData);
    Object.entries(savedData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
