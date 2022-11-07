import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  btn: document.querySelector('button'),
};

let lastPromiseIndex = 0;
let promiseID = 0;

refs.form.addEventListener('submit', onFormClick);

function onFormClick(event) {
  event.preventDefault();
  const inputRefs = document.querySelectorAll('input');

  refs.btn.disabled = true;
  refs.btn.style.backgroundColor = 'red';

  const params = {
    first: Number(inputRefs[0].value),
    delay: Number(inputRefs[1].value),
    amount: Number(inputRefs[2].value),
  };

  const promises = [];
  let delay = params.first;

  for (let i = 0; i < params.amount; i++) {
    promises.push(createPromise(i, delay));
    delay += params.delay;
  }
  lastPromiseIndex = promises.length;
  Promise.all(promises);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        test();
        Notify.success(`resolve position${position + 1}, with time ${delay}`);
      }, delay);
    } else {
      setTimeout(() => {
        test();
        Notify.failure(`reject position${position + 1}, with time ${delay}`);
      }, delay);
    }
  });
}

function test() {
  promiseID += 1;
  // console.log(promiseID, lastPromiseIndex);
  if (promiseID === lastPromiseIndex) {
    promiseID = 0;
    refs.btn.disabled = !true;
    refs.btn.style.backgroundColor = 'rgb(90, 189, 255)';
    return;
  }
}
