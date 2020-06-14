const name = document.querySelector(".js-name"),
  form = name.querySelector("form"),
  input = form.querySelector("input"),
  greeting = name.querySelector(".greeting"),
  namecheck = name.querySelector(".namecheck");

const USER_LS = "currentname",
  SHOW_CN = "showing";

function checkHour() {
  const date = new Date(),
    hours = date.getHours();
  if (hours > 4 && hours <= 10) {
    // 5시~ 10시
    return "Good morning";
  } else if (hours > 10 && hours <= 17) {
    // 11시~17시
    return "Good afternoon";
  } else if (hours > 17 && hours <= 20) {
    // 18시~20시
    return "Good Evening";
  } else {
    return "Good Night.";
  }
}

function handleNameRemove() {
  localStorage.removeItem(USER_LS);
  form.classList.add(SHOW_CN);
  greeting.classList.remove(SHOW_CN);
  namecheck.classList.remove(SHOW_CN);
  loadName();
}

function paintHello(name) {
  form.classList.remove(SHOW_CN);
  greeting.classList.add(SHOW_CN);
  namecheck.classList.add(SHOW_CN);
  greeting.innerText = `${checkHour()} ${name}!`;
  namecheck.innerText = `I'm not ${name}.`;
  namecheck.addEventListener("click", handleNameRemove);
}

function saveName(event) {
  event.preventDefault();
  const name = input.value;
  localStorage.setItem(USER_LS, name);
  paintHello(name);
}

function askForName() {
  form.classList.add(SHOW_CN);
  form.addEventListener("submit", saveName);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintHello(currentUser);
  }
}

function init() {
  loadName();
}

init();
