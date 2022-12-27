import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const messageInput = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    console.log(savedData);
    emailInput.value = savedData.email;
    messageInput.value = savedData.message;
  }
}
