const weatherToday = document.querySelector(".js-weather-today"),
  weatherTomorrow = document.querySelector(".js-weather-tomorrow");

const COORDS = "coords";
const API_KEY = "04bb781a3cf5e3e1be13e13ed5f28cc0";

function getWeather(Obj) {
  const lat = Obj.latitude,
    lon = Obj.longitude;
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      const todayTemp = json.current.temp,
        todayWeather = json.current.weather[0].description,
        tomTemp = json.daily[1].temp.day,
        tomWeather = json.daily[1].weather[0].description;
      weatherToday.innerHTML = `현재 ${Math.floor(
        todayTemp
      )}℃ / ${todayWeather}`;
      weatherTomorrow.innerHTML = `내일 ${Math.floor(
        tomTemp
      )}℃ / ${tomWeather}`;
    });
}

function saveGeo(Obj) {
  localStorage.setItem(COORDS, JSON.stringify(Obj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude,
    coordsObj = {
      latitude,
      longitude
    };
  saveGeo(coordsObj);
  getWeather(coordsObj);
}

function handleGeoError() {
  console.log("Cannot get Geo-location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords);
  }
}

function init() {
  loadCoords();
}

init();
