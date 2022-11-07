const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let idTimer = null;

refs.start.addEventListener('click', onBtnStart);
refs.stop.addEventListener('click', onBtnStop);
refs.stop.style.marginLeft = '15px';

function onBtnStart() {
  changeBgColor();
  refs.start.disabled = true;
  refs.stop.disabled = false;
  refs.start.style.transform = 'scale(1)';
  refs.stop.style.transform = 'scale(1.5)';
}

function onBtnStop() {
  refs.stop.disabled = true;
  refs.start.disabled = false;

  refs.stop.style.transform = 'scale(1)';
  refs.start.style.transform = 'scale(1.5)';
  clearInterval(idTimer);
}

function changeBgColor() {
  idTimer = setInterval(setBgColor, 1000);
}

function setBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
