import "./styles.css";

const clockDiv = document.querySelector(".js-clock"),
  clockTitle = clockDiv.querySelector("h1");

function twoNumber(number) {
  const result = number < 10 ? "0" + number : number;
  return result;
}

function jsclock() {
  const date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  clockTitle.innerText = `${twoNumber(hours)}:${twoNumber(minutes)}:${twoNumber(
    seconds
  )}`;
}

function init() {
  setInterval(jsclock, 1000);
}

init();
