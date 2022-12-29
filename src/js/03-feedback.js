import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const messageInput = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
const STORAGE_GETTTING = localStorage.getItem(STORAGE_KEY);
const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  // console.log(formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const savedDataObject = {};
  const savedData = new FormData(form);
  savedData.forEach((name, value) => {
    savedDataObject[name] = value;
  });
  console.log(savedDataObject);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const savedData = JSON.parse(STORAGE_GETTTING);
  if (savedData) {
    emailInput.value = savedData.email;
    messageInput.value = savedData.message;
  }
}
