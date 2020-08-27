function getWeather(adress) {
  const urlWeather = `http://localhost:4000/weather?address=${adress}`;
  fetch(urlWeather)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error));
}

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = input.value;

  getWeather(address);
});
