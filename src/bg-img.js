const body = document.querySelector("body");

const IMG_N = 3;

function paintBg(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber}.jpg`;
  image.classList.add("bgImg");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_N);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintBg(randomNumber);
}

init();
