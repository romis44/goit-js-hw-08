// Add imports above this line
// import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
// Change code below this line
import { galleryItems } from './gallery-items.js';
// Change code below this line
import 'simplelightbox/dist/simple-lightbox.min.css';
// console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
const galleryMarcup = createGallery(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', galleryMarcup);

function createGallery(item) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `

      <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    `;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
