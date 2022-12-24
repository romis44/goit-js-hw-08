import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// console.log(Player);
import { galleryItems } from './gallery-items.js';
// Change code below this line

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (currentTime) {
    const seconds = currentTime.seconds;
    localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
    console.log('played the video!');
  }, 1000)
);
const currentTime = localStorage.getItem('videoplayer-current-time');
if (currentTime) {
  player.setCurrentTime(currentTime);
}
