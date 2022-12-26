import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const messageInput = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', onFormSubmit);
emailInput.addEventListener('input', throttle(onFormInput, 500));
messageInput.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

form.addEventListener('input', evt => {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);
});

function onFormInput(evt) {
  // const message = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
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
