import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_orange.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.disabled = true;
refs.start.addEventListener('click', onClick);

let timerId = null;
let difference;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userMilliseconds = selectedDates[0].getTime();
    const currentMilliseconds = options.defaultDate.getTime();
    difference = userMilliseconds - currentMilliseconds;

    const { days, hours, minutes, seconds } = convertMs(difference);

    if (currentMilliseconds > userMilliseconds) {
      refs.start.disabled = true;
      Notify.failure('Выберите дату в будущем');
      return;
    }
    refs.start.disabled = !true;

    refs.day.textContent = addLeadingZero(days);
    refs.hour.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  },
};

function onClick() {
  if (timerId > 0) {
    return;
  }
  timerId = setInterval(updateTimer, 1000);
  Notify.success('Таймер запущен');
}

function updateTimer() {
  const { days, hours, minutes, seconds } = convertMs(difference);
  difference -= 1000;

  refs.day.textContent = addLeadingZero(days);
  refs.hour.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);

  console.log(difference, timerId);
  if (difference < 0) {
    clearInterval(timerId);
  }
}

flatpickr(refs.input, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// const timer = {
//   start() {
//     if (timerId !== 0){
//       return;
//     }
//     const timerId = setInterval(() => {
//       const date = Date.now();
//       console.log(date);
//     }, 1000);

//     this.id = timerId;
//   },
//   id: 0,
//   stop() {

//     clearInterval(this.id);
//     this.id = 0;
//   }
// };

// timer.start();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
